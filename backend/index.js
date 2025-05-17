const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const { timeStamp } = require("console")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
const {user_router, user_auth_router} = require("./controllers/UserController.js")
const {website_router, website_auth_router} = require("./controllers/WebsiteController.js")
const {comment_router, comment_auth_router} = require("./controllers/CommentController.js")
dotenv.config();
const app = express() //utworzenie obiektu aplikacji app express
const PORT = 3000 //ustawienie portu
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.set("views", path.join(__dirname, "/"))

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.SUPER_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}


mongoose.connect('mongodb://root:example@mongo:27017/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
app.use("/user", user_router)
app.use("/website", website_router)
app.use("/comment", comment_router)
user_auth_router.use("/", authenticateToken)
website_auth_router.use("/", authenticateToken)
comment_auth_router.use("/", authenticateToken)
app.use("/user", user_auth_router)
app.use("/website", website_auth_router)
app.use("/comment", comment_auth_router)
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`))