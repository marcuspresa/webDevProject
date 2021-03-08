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
				accountManager.generateToken(username, function (error, idToken) {
					if (error)
						return res.render("accounts-sign-up.hbs", { errors: [error] })

					req.session.account = account
					req.session.login = true
					req.session.token = idToken
					res.render("home.hbs", { login: true, account: account, token: idToken })
				})
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
				accountManager.generateToken(username, function (error, idToken) {
					if (error)
						return res.render("accounts-sign-in.hbs", { errors: [error] })

					req.session.account = account					
					req.session.login = true
					req.session.token = idToken
					res.render("home.hbs", { login: true, account: account, token: idToken})
				})
			}
		})
	})

	router.get("/sign-out", function (request, response) {
		request.session.destroy()
		response.render("sign-out.hbs" , {login: false })
	})
/*
	router.get("/", function (request, response) {
		accountManager.getAllAccounts(function (errors, accounts) {
			const model = {
				errors: errors,
				accounts: accounts,
				login: request.session.login
			}
			//response.render("accounts-list-all.hbs", model)
			response.json(model)
		})
	})

	router.get('/:username', function (request, response) {

		const username = request.params.username

		accountManager.getAccountByUsername(username, function (error, account) {
			const model = {
				errors: error,
				account: account,
				login: request.session.login
			}
			//		response.render("accounts-show-one.hbs", model)
			response.json(model)
		})

	})*/

	return router

}

