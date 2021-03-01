const express = require("express");
const Confirmation = require("../models/confirmation");
const User = require("../models/users");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
      const confirmation = await Confirmation.findById(req.params.id);
      if(!confirmation){
          res.status(404).send("Confirmation link is invalid")
          return
      }
      const user = await User.findById(confirmation.userId).select('-password -__v');
      if(!user){
        res.status(404).send("Can't Find this User")
        return
      }
      user.isConfirmed = true;
      const token = user.generateToken();
      await user.save()
      await confirmation.delete()
      res.send({user:user,token:token,message:"confiremd successfully"});
  } catch (e) {
    res.status(500).send({err:e,mssage:"Failed to confirm"})
  }
});

module.exports = router
