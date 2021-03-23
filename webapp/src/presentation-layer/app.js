const express = require('express')
const awilix = require('awilix')
const { response } = require('express')


/* Middlewares */
const expressHandlebars = require('express-handlebars')
const expressSession = require('express-session')
const path = require('path')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express()

/*Business logic layer*/
const accountManager = require('../business-logic-layer/account-manager')
const accountValidator = require('../business-logic-layer/account-validator')
const postManager = require('../business-logic-layer/post-manager')

/*Database*/
//const accountRepository = require('../data-access-layer/sql/account-repository')
//const postRepository = require('../data-access-layer/sql/post-repository')
//const db = require('../data-access-layer/sql/db.js')
const redisStore = require('connect-redis')(expressSession)
const db = require('../data-access-layer/sequelize/db')
const accountRepository = require('../data-access-layer/sequelize/account-repository')
const postRepository = require('../data-access-layer/sequelize/post-repository')


/*`Routers*/
const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const apiRouter = require('./routers/api/api-router')
const apiPostRouter = require('./routers/api/post-router')
const postRouter = require('./routers/post-router')



/*Awilix containers*/
const container = awilix.createContainer()
container.register("postRepository", awilix.asFunction(postRepository))
container.register("db", awilix.asValue(db))
container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("postManager", awilix.asFunction(postManager))
container.register("variousRouter", awilix.asFunction(variousRouter))
container.register("postRouter", awilix.asFunction(postRouter))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))
container.register("accountValidator", awilix.asFunction(accountValidator))
container.register("apiRouter", awilix.asFunction(apiRouter))
container.register("apiPostRouter", awilix.asFunction(apiPostRouter))

const theAccountRouter = container.resolve('accountRouter')
const theApiRouter = container.resolve('apiRouter')
const theApiPostRouter = container.resolve('apiPostRouter')
const theVariousRouter = container.resolve('variousRouter')
const thePostRouter = container.resolve('postRouter')


app.engine('hbs', expressHandlebars({
	extname: 'hbs',
	defaultLayout: 'main',
	helpers: {
		ifEquals: function (val1, val2, options) {
			if (val1 == val2) {
				return options.fn(this);
			}
			return options.inverse(this)
		}
	},
	layoutsDir: path.join(__dirname, 'layouts')
}))

// Handle static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'))

app.use(cors())

// ta bort detta
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "*")
	res.setHeader("Access-Control-Allow-Headers", "*")
	next()
})

app.use(expressSession({
	secret: 'forum',
	resave: false,
	store: new redisStore({
		host: 'redis',
		port: 6379,
		ttl: 260
	}),
	saveUninitialized: false,
}))




// Attach all routers.

app.use('/api/posts', theApiPostRouter)
app.use('/api', theApiRouter)

app.use(function (req, res, next) {
	if (req.session.account) {
		res.locals.account = req.session.account
		if (req.session.token) {
			res.locals.token = req.session.token
			if (req.session.login) {
				res.locals.login = req.session.login
			}
		}
	}
	next()
})

app.use('/', theVariousRouter)
app.use('/accounts', theAccountRouter)
app.use('/posts', thePostRouter)


// Start listening for incoming HTTP requests!
app.listen(8080, function () {})

app.use(function (req, res, next) {
	if (res.status(404)) {
		res.send('404: File Not Found :(')
	}
	//lägg till 500
})
