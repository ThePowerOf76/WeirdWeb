const express = require("express")
const { check, validationResult } = require("express-validator")
const user_router = express.Router();
const user_auth_router = express.Router();
const User = require("../models/User.js")
const jwt = require("jsonwebtoken")

function generateAccessToken(username) {
  return jwt.sign(username, process.env.SUPER_SECRET, { expiresIn: '1800s' });
}
const argon2 = require('argon2')

user_router.post("/login", [
  check('username').trim().custom(name => {
    if(!name || name.length == 0) {
      throw new Error("Username must not be blank")
    }
    return true
  })
  ,
  check('password').trim().custom(pass => {
    if(!pass || pass.length == 0) {
      throw new Error("Username must not be blank")
    }
    return true
  })], async function(req, res) {
    console.log("DIS")
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
    }
    const username = req.body['username']
    const password = req.body['password']
    const user = await User.findOne({username: username})
    if(user == null) {
      res.status(401).send("Invalid username or password");
    }
    if(await argon2.verify(user.password, password)) {
      const token = generateAccessToken({ username: user.username });
      res.status(200).send({user: user.username, pfp: user.pfp, token: token})
    } else {
      res.status(401).send("Invalid username or password");
    }

    
  })
  user_auth_router.get('/:nick', async function(req, res) {
    const user = await User.findOne({username: req.params.nick})
    if(user != null) {
      let obj = {username: user.username, pfp: user.pfp, comments: user.latest_comments}
      res.status(200).send(obj)
    } else {
      res.status(404).send("User not found")
    }


})
user_router.post("/", [
  check('username').trim().custom(name => {
    if(!name) {
      throw new Error("Username must not be blank")
    }
  })
  ,
  check('email').trim().normalizeEmail().isEmail().withMessage("Invalid email"),
  check('password').trim().custom(pass => {
    if(!pass) {
      throw new Error("Username must not be blank")
    }
  })],
  async function(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const username = req.body['username']
      const email = req.body['email']
      const password = req.body['password']
      let count = await User.countDocuments({username: username});
      if(count>0){
        return res.status(400).json({ error: 'This username is taken.' });
      }
      count = await User.countDocuments({email: email})   
      if(count>0){
        return res.status(400).json({ error: 'This email is taken.' });
      }
    
      const newUser = new User({
        username: username,
        email: email,
        password: await argon2.hash(password)
      })
      const savedUser = await newUser.save();
      res.status(201).json("User created successfully");
    } catch(error) {
      console.error(error);
        if (error.name === 'ValidationError') {
          const errors = {};
          for (let field in error.errors) {
            errors[field] = error.errors[field].message;
          }
          return res.status(400).json({ error: 'Validation failed', details: errors });
        } else {
          res.status(500).json({ error: 'Failed to create user.' });
        }
    }

})

    module.exports = {user_router, user_auth_router};