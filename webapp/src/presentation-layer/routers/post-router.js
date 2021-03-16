const express = require('express')

module.exports = function ({ postManager }) {
	const router = express.Router()
	router.use(express.urlencoded({ extended: false }))

	router.get("/", function (request, response) {
		postManager.getAllPosts(function (errors, posts) {
			const model = {
				errors: errors,
				posts: posts,
				login: request.session.login
			}
			response.render("posts.hbs", model)
		})
	})

	router.get("/new", function (request, response) {
		if (request.session.login) {
			const model = {
				login: request.session.login
			}
			response.render("new-post.hbs", model)
		} else {
			response.redirect("/accounts/sign-in")
		}
	})

	router.post("/new", function (request, response) {

		const title = request.body.title
		const body = request.body.body
		const accountId = request.session.account.id
		const username = request.session.account.username
		postManager.createPost(title, body, username, accountId, function (error, createdPostId) {
			if (error) {
				console.log("APA")
				return response.render("new-post.hbs", { error: error })
			}
			response.redirect("/posts/" + createdPostId)
		})

	})

	router.get("/:id", function (request, response) {
		const id = request.params.id
		postManager.getPostWithPostID(id, function (error, post) {
			if (error) {
				return response.render('post.hbs', { error: error })
			}
			postManager.getCommentsWithPostId(id, function (error, comments) {
				console.log(post.body + "apa2")
				const model = {
					post: post,
					comments: comments,
					error: error,
					login: request.session.login,
					account: request.session.account
				}
				response.render("post.hbs", model)
			})
		})
	})

	router.post("/:id", function (request, response) {
		const id = request.params.id
		const comment = request.body.comment
		postManager.getPostWithPostID(id, function (error, post) {
			postManager.createCommentOnPostId(id, comment, request.session.account.username, function (error) {
				if (error) {
					return response.render('post.hbs', { error: error })
				} else {
					postManager.getCommentsWithPostId(id, function (error, comments) {
						const model = {
							error: error,
							post: post,
							comments: comments,
							login: request.session.login
						}
						response.render('post.hbs', model)
					})
				}
			})
		})
	})

	return router
}