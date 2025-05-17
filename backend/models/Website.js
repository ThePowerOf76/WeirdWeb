const mongoose = require("mongoose")
const CommentSchema = require("./Comment").CommentSchema;
const websiteSchema = new mongoose.Schema({
    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true, 
      maxLength: 200  
    },
    url: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate URLs
      trim: true,
      validate: {
        validator: function(v) {
          // Basic URL validation using regex.  Can be improved.
          return /^(http.?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
    content:  {
        type: String,
        required: false
        
    },
    dateOfRetrieval: {
        type: Date,
        required: true
    },
    
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    numberOfRatings: {
      type: Number,
      default: 0
    }, 
    tags: {
      type: [String]
    },
    latest_comments: {
      type: [CommentSchema]
    }
}, {
    timestamps: true
});
const Website = mongoose.model("Website", websiteSchema);
module.exports = Website;
