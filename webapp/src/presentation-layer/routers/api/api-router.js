const express = require('express')
const jwt = require("jsonwebtoken")
const jwtSecret = "adfsdfsdfsdfsd"

module.exports = function ({
	accountManager,
	accountValidator,
	commentManager,
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


	router.post("/tokens", function (request, response) {
		const grant_type = request.body.grant_type
		const username = request.body.username
		const password = request.body.password
		if (grant_type != "password") {
			response.status(400).json({
				error: "unsupported_grant_type"
			})
			return
		}
		accountValidator.validateAccount(username, password, function (errors, account) {
			if (errors.length) {
				response.status(400).end()
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

	
	
	router.get("/accounts/:id/posts", function (request, response) {
		const accountId = request.payload.accountId
		postManager.getPostWithAccountId(accountId, function (error, posts) {
			if (error.length) {
				response.status(400).end()
			}
			else {
				response.status(200).json(posts)
			}
		})

	})

	return router
}

