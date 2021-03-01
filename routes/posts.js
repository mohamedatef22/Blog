const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Post = require("../models/posts");
const { contain } = require("../utilities/helper");

router.post("/", auth, async (req, res) => {
  try {
    if (contain(Object.keys(req.body), ["likes", "comments"])) {
      res.status(400).send("body contain forbidden proberty");
      return;
    }
    const post = new Post(req.body);
    post.userName = req.user.userName;
    post.owner = req.user._id;
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(500).send({ message: "failed to create post", err: e });
  }
});

router.post("/comments/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(404).send("Not Found");
        return
    }
    post.comments.push({
        comment:req.body.comment,
        owner:req.user._id,
        userName:req.user.userName
    });
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(500).send({ message: "failed to create post", err: e });
  }
});

router.post("/likes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(404).send("Not Found");
        return
    }
    if(post.likes.includes(req.user._id)){
        const index = post.likes.indexOf(req.user._id);
        post.likes.splice(index,1);
        await post.save()
        res.send(post)
        return
    }
    post.likes.push(req.user._id);
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(500).send({ message: "failed to create post", err: e });
  }
});

router.get('/', async (req,res)=>{
    try {
        // must make pagination
        const posts = await Post.find();
        res.send(posts);
    } catch (e) {
        res.status(500).send({err:e,message:"failed to get posts"})
    }
})

module.exports = router;
