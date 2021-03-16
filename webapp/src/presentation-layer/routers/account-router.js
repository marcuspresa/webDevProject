const express = require('express')


module.exports = function ({ accountManager, accountValidator }) {

	const router = express.Router()

	router.get("/sign-up", function (request, response) {
		response.render("accounts-sign-up.hbs")
	})

	router.get("/sign-in", function (request, response) {
		if (request.session.login == true) {
			const model = {
				account: request.session.account
			}
			response.render("home.hbs", model)
		}
		else {
			response.render("accounts-sign-in.hbs")

		}

	})

	router.post("/sign-up", function (req, res) {
		const username = req.body.username
		const password = req.body.password
		accountManager.createAccount(username, password, function (errors, account) {
			if (errors) {
				res.render("accounts-sign-up.hbs", { errors: errors })

			} else {
				if (error)
					return res.render("accounts-sign-up.hbs", { errors: [error] })

				req.session.account = account
				req.session.login = true
				res.render("home.hbs", { login: true, account: account })

			}
		})
	})

	router.post("/sign-in", function (req, res) {
		const username = req.body.username
		const password = req.body.password
		accountValidator.checkCredentials(username, password, function (error, account) {
			if (error) {
				res.render("accounts-sign-in.hbs", { error: error })
			}
			else {
				if (error)
					return res.render("accounts-sign-in.hbs", { errors: [error] })
				req.session.account = account
				req.session.login = true
				res.render("home.hbs", { login: true, account: account })
			}
		})
	})

	router.get("/sign-out", function (request, response) {
		request.session.destroy()
		response.locals.account = null
		response.locals.token = null
		response.locals.login = false
		response.render("sign-out.hbs", { login: false })
	})

	return router

}


