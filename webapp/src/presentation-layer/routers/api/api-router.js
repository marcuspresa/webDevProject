const express = require('express')
const jwt = require("jsonwebtoken")
const jwtSecret = "5kRh21AucYhm3but2s67jEIWSy1mJekN"
/*
JWT secrets ska ligga i en konstant, som du ser här har jag hårdkodat in värdena.
*/
module.exports = function ({ accountManager, accountValidator }) {
	const router = express.Router()

	//API- Login/get access-token
	router.post("/tokens", function (request, response) {
		const grant_type = request.body.grant_type
		const username = request.body.username
		const password = request.body.password
		if (grant_type != "password") {
			response.status(400).json({ error: "unsupported_grant_type" })
			return
		}
		accountValidator.checkCredentials(username, password, function (errors, account) {
			if (errors != null) {
				response.status(500).json({ errors });
			}
			else {
				const accessToken = jwt.sign({
					accountId: account.id
				},jwtSecret)
				const idToken = jwt.sign({
					sub: account.id,
					preferred_username: account.username
				}, "secret")
				response.status(200).json({ access_token: accessToken, id_token: idToken })
			}
		})
	})
	
	// create account
	router.post("/createaccount", function (request, response, next) {
		const username = request.body.username
		const password = request.body.password
		accountManager.createAccount(username, password, function (errors, accounts) {
			if (errors != null) {
				response.status(500).json(errors);
			}/*
			if (accounts == null) {
				response.status(400)
			}*/
			else {
				response.status(200).json({ message: "Ok" })
			}
		})
	})
	return router
}

