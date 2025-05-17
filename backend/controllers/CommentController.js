const express = require("express")
const comment_router = express.Router();
const comment_auth_router = express.Router();
const Comment = require("../models/Comment.js").Comment;
comment_auth_router.get("/user/:user", function(req, res) {
    
})
module.exports = {comment_router, comment_auth_router}