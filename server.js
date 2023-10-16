// require necessary NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// require route files

const goalRoutes = require('./app/routes/goal_routes')
const actionRoutes = require('./app/routes/action_routes')
const journalRoutes = require('./app/routes/journalEntry_routes')
const userRoutes = require('./app/routes/user_routes')
const routineRoutes = require('./app/routes/routine_routes')
const imageRoutes = require('./app/routes/image_routes')



// require middleware
const errorHandler = require('./lib/error_handler')
const replaceToken = require('./lib/replace_token')
const requestLogger = require('./lib/request_logger')


// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 8000
const clientDevPort = 3000

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
	useNewUrlParser: true,
})

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(
	cors({
		origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
	})
)
// gives error messages
app.use(morgan('dev'))
// define port for API to run on
// adding PORT= to your env file will be necessary for deployment
const port = process.env.PORT || serverDevPort

// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token token=<token>` OR the Express convention of
// `Authorization: Bearer <token>`
app.use(replaceToken)

// register passport authentication middleware
app.use(auth)

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json({limit: '50mb'}))
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({  limit: '50mb',extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// register route files

app.use(goalRoutes)
app.use(journalRoutes)
app.use(actionRoutes)
app.use(userRoutes)
app.use(routineRoutes)
app.use(imageRoutes)



// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

// run API on designated port (4741 in this case)
app.listen(port, () => {
	console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
