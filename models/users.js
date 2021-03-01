const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: "this email is not valid",
    },
  },
  password: {
    type: String,
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
      type:Boolean,
      default:false
  },
  isActivate:{
    type:Boolean,
    default:true
  },
});

userSchema.methods.generateToken = function (){
  const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin,userName:this.userName},"testPrivateKey");
  return `Bearer ${token}`;
} 

const User = mongoose.model('User',userSchema);

module.exports = User;
