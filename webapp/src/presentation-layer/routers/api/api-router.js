const express = require('express')
const jwt = require("jsonwebtoken")
const jwtSecret = "adfsdfsdfsdfsd"

module.exports = function ({
	accountManager,
	accountValidator,
	postManager
}) {
	const router = express.Router()
	
	router.use(function (request, response, next) {
		try {
			const authorizationHeader = request.get("Authorization")
			if (!authorizationHeader)
				throw new Error("No authorization header")
			const accessTokenString = authorizationHeader.substr("Bearer ".length)
			request.accessToken = accessTokenString
			next()
		} catch (error) {
			console.log(error)
			next(error)
		}
	})

	//API- Login/get access-token
	router.post("/tokens", function (request, response) {
		const grant_type = request.body.grant_type
		const username = request.body.username
		const password = request.body.password
		if (grant_type != "password") {
			response.status(400).json({error: "unsupported_grant_type"})
			return
		}
		accountValidator.checkCredentials(username, password, function (errors, account) {
			if (errors.length) {
				response.status(500).json({ error: "Error_logging_in" });
			}
			else {
				const accessToken = jwt.sign({
					accountId: account.id
				}, jwtSecret)
				const idToken = jwt.sign({
					sub: account.id,
					preferred_username: account.username
				}, "secret")
				response.status(200).json({
					access_token: accessToken,
					id_token: idToken
				})
			}
		})
	})

	// create account
    router.post("/createaccount", function (req, res, next) {
		const username = req.body.username
		const password = req.body.password
		accountManager.createAccount(username, password, function (errors, accounts) {
			if (errors.length) {
				res.status(500).json("Error creating account");
			}
			else if (accounts == null) {
				res.status(400).end()
			}
			else {
				res.status(200).end()
			}
		})
	})
	return router
}

