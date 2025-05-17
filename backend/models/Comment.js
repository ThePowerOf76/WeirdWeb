const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  website: {
    title: {
      type: String, 
      required: true
    },
    url: {
      type: String,
      required: true,
    }
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0 
  },
  comment: {
    type: String,
    maxLength: 200
  }
}, {
  timestamps: true
})
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = {Comment, CommentSchema};