const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bycrpt = require("bcryptjs");
const { contain, exclude } = require("../utilities/helper");
const validator = require("validator");
const Confirmation = require("../models/confirmation");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.post("/register", async (req, res) => {
  try {
    if (
      contain(Object.keys(req.body), ["isAdmin", "isConfirmed", "isActivate"])
    ) {
      res.status(400).send("body contain forbidden proberty");
      return;
    }
    const user = new User(req.body);
    const salt = await bycrpt.genSalt(10);
    user.password = await bycrpt.hash(user.password, salt);
    const confirm = new Confirmation({ userId: user._id });
    await user.save();
    await confirm.save();
    res.send({
      user: exclude(user, ["password", "__v"]),
      confirmationUrl: `/api/confirm/${confirm._id}`,
    });
  } catch (e) {
    res.status(500).send({ message: "Failed to register due to: ", err: e });
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send("Failed to login. You must send email and password");
    }
    if (validator.isEmail(req.body.email)) {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(401).send("Invalid Email or password");
        return;
      }
      const result = await bycrpt.compare(req.body.password, user.password);
      if (!result) {
        res.status(401).send("Invalid Email or password");
        return;
      }
      if (!user.isConfirmed) {
        res.status(401).send("You must confirm your email addresse");
        return;
      }
      if (!user.isActivate) {
        res.status(401).send("Your account has been deactivated");
        return;
      }
      const token = user.generateToken();
      res.send(token);
      return;
    } else {
      const user = await User.findOne({ userName: req.body.email });
      if (!user) {
        res.status(401).send("Invalid Email or password");
        return;
      }
      const result = await bycrpt.compare(req.body.password, user.password);
      if (!result) {
        res.status(401).send("Invalid Email or password");
        return;
      }
      if (!user.isConfirmed) {
        res.status(401).send("You must confirm your email addresse");
        return;
      }
      const token = user.generateToken();
      res.send(token);
      return;
    }
  } catch (e) {
    res.status(500).send(`error: ${e}`);
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    res.send(user);
  } catch (e) {
    res.status(500).send("Failed to get User");
  }
});

router.post("/deactivate/:id", auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("Not Found");
      return;
    }
    user.isActivate = false;
    await user.save();
    res.send("successfuly deactivated");
  } catch (e) {
    res.status(500).send({ err: e, message: "failed to deactive" });
  }
});

router.post("/activate/:id", auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("Not Found");
      return;
    }
    user.isActivate = true;
    await user.save();
    res.send("successfuly activated");
  } catch (e) {
    res.status(500).send({ err: e, message: "failed to active" });
  }
});

module.exports = router;
