
const express = require('express')
const passport = require('passport')
const Entry = require('../models/journalEntry')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /goals
router.get('/journal', requireToken, (req, res, next) => {
	Entry.find({owner: req.user.id})
	.populate('owner')
		.then((entries) => {
			// `gaols` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return entries.map((entry) => entry.toObject())
		})
		// respond with status 200 and JSON of the goals
		.then((entries) => res.status(200).json({ entries: entries}))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /goals/5a7db6c74d55bc51bdf39793
router.get('/journal/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Entry.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "goal" JSON
		.then((entry) => res.status(200).json({ entry: entry.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /goals
router.post('/journal', requireToken, (req, res, next) => {
	// set owner of new goal to be current user
	req.body.entry.owner = req.user.id

	Entry.create(req.body.entry)
		// respond to succesful `create` with status 201 and JSON of new "goal"
		.then((entry) => {
			res.status(201).json({ entry: entry.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /goals/5a7db6c74d55bc51bdf39793
router.patch('/journal/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.entry.owner

	Entry.findById(req.params.id)
		.then(handle404)
		.then((entry) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			// requireOwnership(req, entry)

			// pass the result of Mongoose's `.update` to the next `.then`
			return entry.updateOne(req.body.entry)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /goals/5a7db6c74d55bc51bdf39793
router.delete('/journal/:id', requireToken, (req, res, next) => {
	Entry.findById(req.params.id)
		.then(handle404)
		.then((entry) => {
			// throw an error if current user doesn't own `goal`
			// requireOwnership(req, entry)
			// delete the goal ONLY IF the above didn't throw
			entry.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
 