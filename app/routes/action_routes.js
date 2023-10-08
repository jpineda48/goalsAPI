
const express = require('express')
const passport = require('passport')
const Goal = require('../models/goal')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()


///create an action
//post= create an action and add to a goal
///post/goals/:actionid
router.post('/actions/:goalId', removeBlanks, (req, res, next) => {
   const action = req.body.action
   const goalId = req.params.goalId
   Goal.findById(goalId)
   .then(handle404)
   .then( goal => {
       goal.actions.push(action)
       return goal.save()
   })
   .then(goal => res.status(201).json({ goal : goal} ))
   .catch(next)
})

///update and action


//delete an action


module.exports = router