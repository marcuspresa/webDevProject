const express = require('express')
const csurf = require("csurf");
const csrfProtection = csurf({ cookie: false });
let csurfToken = "";

module.exports = function ({ postManager }) {
	const router = express.Router()
	router.use(express.urlencoded({ extended: false }))

	router.get("/",csrfProtection, function (request, response) {
		csurfToken = request.csrfToken();
		postManager.getAllPosts(function (errors, posts) {
			const model = {
				errors: errors,
				posts: posts,
				login: request.session.login,
				csrfToken: csurfToken
			}
			response.render("posts.hbs", model)
		})
	})

	router.get("/new",csrfProtection, function (request, response) {
		csurfToken = request.csrfToken();
		if (request.session.login) {
			response.render("new-post.hbs", {login: request.session.login, csrfToken: csurfToken})
		} else {
			response.redirect("/accounts/sign-in")
		}
	})

	router.post("/new", function (request, response) {
		if (csurfToken === request.body._csrf) {
		const title = request.body.title
		const body = request.body.body
		const accountId = request.session.account.id
		const username = request.session.account.username
		postManager.createPost(title, body, username, accountId, function (error, createdPostId) {
			if (error) {
				return response.render("new-post.hbs", { error: error, login: request.session.login, title: title, body: body, csrfToken: csurfToken })
			}
			response.redirect("/posts/" + createdPostId)
		})
	}else{}

	})

	router.get("/:id",csrfProtection, function (request, response) {
		csurfToken = request.csrfToken();
		const id = request.params.id
		postManager.getPostWithPostID(id, function (postError, post) {
			postManager.getCommentsWithPostId(id, function (error, comments) {
				const model = {
					post: post,
					csrfToken: csurfToken,
					comments: comments,
					error: error,
					postError: postError,
					login: request.session.login,
					account: request.session.account
				}
				response.render("post.hbs", model)
			})
		})
	})

	router.post("/:id", function (request, response) {
		if (csurfToken === request.body._csrf) {
		const id = request.params.id
		const comment = request.body.comment
		postManager.getPostWithPostID(id, function (postError, post) {
			postManager.createCommentOnPostId(id, comment, request.session.account.username, request.session.account.id, function (createCommentError) {
				postManager.getCommentsWithPostId(id, function (error, comments) {
					const model = {
						error: error,
						csrfToken: csurfToken,
						postError: postError,
						createCommentError: createCommentError,
						post: post,
						comment: comment,
						comments: comments,
						login: request.session.login
					}
					response.render('post.hbs', model)
				})

			})
		})
	}else{}
	})

	return router
}