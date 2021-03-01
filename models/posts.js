const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      maxlength: 255,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      new mongoose.Schema(
        {
          comment: {
            type: String,
            maxlength: 255,
            required: true,
          },
          owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          userName: {
            type: String,
            required: true,
          },
          // replaies: [] can add replies to comments
        },
        { timestamps: true }
      ),
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
