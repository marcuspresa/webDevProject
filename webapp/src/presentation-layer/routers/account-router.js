const express = require('express')
const csurf = require("csurf");
const csrfProtection = csurf({ cookie: false });
let csurfToken = "";

module.exports = function ({ accountManager, accountValidator }) {

	const router = express.Router()
	router.use(csrfProtection);

	router.get("/sign-up",csrfProtection, function (request, response) {
		csurfToken = request.csrfToken();
		response.render("accounts-sign-up.hbs", {csrfToken: csurfToken})
	})

	router.get("/sign-in",csrfProtection, function (request, response) {
		csurfToken = request.csrfToken();
		if (request.session.login == true) {
			const model = {
				account: request.session.account,
				csrfToken: csurfToken
			}
			response.render("home.hbs", model)
		}
		else {
			response.render("accounts-sign-in.hbs", {csrfToken: csurfToken})

		}

	})

	router.post("/sign-up", function (request, res) {
		if (csurfToken === request.body._csrf) {
		
		const username = request.body.username
		const password = request.body.password

		accountManager.createAccount(username, password, function (errors, account) {
			if (errors)
				return res.render("accounts-sign-up.hbs", { errors: [errors], username: username, csrfToken: csurfToken })
			request.session.account = account
			request.session.login = true
			res.render("home.hbs", { login: true, account: account, csrfToken: csurfToken })
		})
	}else{
		console.log("BEBE")
	}
	})

	router.post("/sign-in", function (request, res) {
		if (csurfToken === request.body._csrf) {

		const username = request.body.username
		const password = request.body.password

		accountValidator.checkCredentials(username, password, function (error, account) {
			if (error) {
				return res.render("accounts-sign-in.hbs", { errors: [error], username: username, csrfToken: csurfToken })
			}
			else {
				request.session.account = account
				request.session.login = true
				res.render("home.hbs", { login: true, account: account, csrfToken: csurfToken })
			}


		})
	}else{
		console.log("BEBE")
	}
	})

	router.get("/sign-out", function (request, response) {
		request.session.destroy()
		response.locals.account = null
		response.locals.login = false
		response.render("sign-out.hbs", { login: false })
	})

	return router

}


