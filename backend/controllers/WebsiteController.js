const express = require("express")
const website_router = express.Router();
const website_auth_router = express.Router();
const Website = require("../models/Website.js")


const entriesPerPage = 2;
website_router.get("/list", async function(req, res){
const sites = await Website.aggregate([{$sort: {"createdAt": -1}}, {$limit: entriesPerPage}])
res.send(sites)

})
website_router.get("/list/page/:page", async function(req, res){
  let page = parseInt(req.params.page)
  if(Number.isNaN(page) || page <= 1) {
    res.redirect("/list")
  } else {
    const sites = await Website.aggregate([{$sort: {"createdAt": -1}}, {$skip: entriesPerPage*(page-1)}, {$limit: entriesPerPage}])
    res.send(sites)
  }
  
  
})
function clearSpecialCharacters(str) {
return str.replace(new RegExp(/\s/, "g"), ' ').replace(new RegExp(/\s\s+/, "g"), ' ');
}
function removeHTMLElements(str) {

return str.replaceAll(new RegExp(/<script.*>[\s\S]*<\/script>/g), " ") //throw out JS
.replaceAll(new RegExp(/<style.*>[\s\S]*<\/style>/g), " ") //throw out CSS
.replaceAll(new RegExp(/"[^"]*(\s|=)>\s*[^"]*"/g), " ") //Throw out any > sign that is is in scripts embedded in elements (causes weird behaviour if ommitted)
.replaceAll(new RegExp(/<[^>]*>/g), " ") //throw out any html tags
}
function getTitle(str) {
const title = str.match(new RegExp("<title>.*<\/title>"))
if(title == null) {
  return ""
}
return title[0].slice(7, -8)
}
function getBody(str) {
const body = str.match(new RegExp(/<body.*>[\s\S]*<\/body>/))
if(body == null) {
  return ""
}
return body[0]
}
website_auth_router.post("/", async function(req, res) {
  try {
      const url = req.body['url'];
      const tags = req.body['tags'];
      if (!url) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }
      Website.countDocuments({url: url}).exec().then(function (err, count){ 
          if(count>0){
              return res.status(400).json({ error: 'This website already exists.' });
          }
      });
      const webdataresp = await fetch(url, { method: 'GET', redirect: 'follow'});
      const text = await webdataresp.text()
      const websitetitle = getTitle(text);
      const content = clearSpecialCharacters(removeHTMLElements(getBody(text)))
      const newWebsite = new Website({
        title: websitetitle,
        url: url,
        content: content,
        dateOfRetrieval: Date.now(),
        averageRating: 0, // Use default value if not provided
        numberOfRatings: 0, // Use default value if not provided
        tags: tags
      })
      const savedWebsite = await newWebsite.save();
      res.status(201).json(savedWebsite);
    } catch (error) {
      console.error(error);
      if (error.name === 'ValidationError') {
        const errors = {};
        for (let field in error.errors) {
          errors[field] = error.errors[field].message;
        }
        return res.status(400).json({ error: 'Validation failed', details: errors });
      } else {
        // Other server errors
        res.status(500).json({ error: 'Failed to create website.' });
      }
    }
})
website_auth_router.get("/shuffle", function(req, res) {
  
})
website_router.get("/:s", async function(req, res) {
  if(!req.params.s) {
    res.status(400).send("Please specify url")
  }
  console.log(req.originalUrl)
  const decodedurl = decodeURIComponent(req.params.s)
  console.log(decodedurl)
  const site = await Website.findOne({url: decodedurl})
  if(site != null) {
    res.send(site)
  } else {
    res.status(404).send("Website not available in database")
  }
})
module.exports = {website_router, website_auth_router};