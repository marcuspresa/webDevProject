const express = require('express')

module.exports = function ({ accountManager }) {
    const router = express.Router()

    router.post("", function (req, res, next) {
		const username = req.body.username
		const password = req.body.password
		accountManager.createAccount(username, password, function (errors, accounts) {
			if (errors.length) {
				res.status(400).end()
				return
			}
			else if (accounts == null) {
				res.status(400).end()
			}
			else {
				res.status(201).end()
				return
			}

		})

	})

    router.get("/:id/posts", function (request, response) {
		const accountId = request.payload.accountId
		postManager.getPostsWithAccountId(accountId, function (error, posts) {
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