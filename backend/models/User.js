const mongoose = require("mongoose")
const CommentSchema = require("./Comment").CommentSchema;
const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      index: true,
      unique: true,
      required: true,
      maxLength: 25
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/.test(v)
        }
      }
    },
    password: {
      type: String, 
      required: true
    },
    pfp: {
      type: Buffer,
      required: false
    },
    latest_comments: {
      type: [CommentSchema]
    }
  }, {
    timestamps: true
  })
const User = mongoose.model("User", UserSchema);
module.exports = User;  