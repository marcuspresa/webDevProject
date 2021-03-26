const express = require('express')
module.exports = function () {
	const router = express.Router()

	router.use(express.urlencoded({ extended: false }))

	router.get("/", function (request, response) {
		const model = {
			account: request.session.account,
			login: request.session.login
		}
		response.render("home.hbs", model)
	})

	return router
}