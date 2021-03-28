const express = require('express')
const csurf = require("csurf");
const csrfProtection = csurf({ cookie: false });
module.exports = function () {
	const router = express.Router()

	router.use(express.urlencoded({ extended: false }))

	router.get("/",csrfProtection, function (request, response) {
		csurfToken = request.csrfToken();
		const model = {
			account: request.session.account,
			csrfToken: csurfToken,
			login: request.session.login
		}
		response.render("home.hbs", model)
	})

	return router
}