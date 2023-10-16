// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
const mongoose = require("mongoose");


// pull in Mongoose model for goals
const Goal = require('../models/goal')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { goal: { title: '', text: 'foo' } } -> { goal: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()
const multer  = require('multer')
require('../models/imageDetails')
const Images = mongoose.model("ImageDetail");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })



router.post('/moods', upload.single('image'), async (req, res) => {
    console.log(req.body)
    const imageName = req.file.filename;
    console.log('this is imageName', imageName)

    try {
        await Images.create({image:imageName})
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error'})
        
    }

})

router.get('/getImage', async (req, res) => {
    try {
        Images.find({}).then((data) => {
            res.send({status: 'ok', data:data})
           
        })
        
    } catch (error) {
        res.json({status:error})
        
    }
})











module.exports = router