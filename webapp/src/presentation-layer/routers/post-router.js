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

	// router.get("/:id/edit", function (request, response) {
	// 	const token = request.session.token
	// 	const id = request.params.id
	// 	if (!request.session.login)
	// 		return response.redirect("/accounts/sign-in")

	// 	postManager.getPostIfOwner(token, id, function (error, post) {
	// 		response.render("edit-post.hbs", { post: post, error: error })
	// 	})

	// })

	// router.post("/:id/edit", function (request, response) {
	// 	const title = request.body.title
	// 	const body = request.body.body
	// 	const account = request.session.account
	// 	const id = request.params.id
	// 	postManager.editPost(account.id, id, title, body, function (error, editedPost) {
	// 		if (error) {
	// 			return response.render("edit-post.hbs", error)
	// 		}
	// 		postManager.getCommentsWithPostId(id, function (error, comments) {
	// 			const model = {
	// 				notification: "Post has been edited successfully",
	// 				notificationType: "success",
	// 				post: editedPost,
	// 				comments: comments,
	// 				error: error,
	// 				isOwner: request.session.account ? editedPost.accountId == request.session.account.id : false
	// 			}
	// 			response.render("post.hbs", model)
	// 		})
	// 	})

	// })

	router.post("/:id/delete", function (request, response) {
		const account = request.session.account
		const id = request.params.id
		postManager.deletePost(account.id, id, function (error, deleted) {
			if (error)
				return response.render("post.hbs", { error: error })

			request.session.notification = "Post has been deleted successfully"
			response.redirect("/posts")
		})

	})

	router.post("/new", function (request, response) {

		const title = request.body.title
		const body = request.body.body
		const accountId = request.session.account.id
		const username = request.session.account.username
		postManager.createPost(title, body, username, accountId, function (error, createdPostId) {
			if (error) {
				return response.render("new-post.hbs", { error: error })
			}
			request.session.notification = "Post has been created successfully"
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
				const model = {
					post: post,
					comments: comments,
					error: error,
					login: request.session.login,
					account: request.session.account,
					isOwner: request.session.account ? post.accountId == request.session.account.id : false
				}
				response.render("post.hbs", model)
			})
		})
	})

	router.post("/:id", function (request, response) {

		const id = request.params.id
		const comment = request.body.comment
		postManager.getPostWithPostID(id, function (error, post) {
			if (error) {
				return response.render("post.hbs", { error })
			}
			postManager.createCommentOnPostId(id, comment, request.session.account.username, function (error) {
				if (error) {
					return response.render("post.hbs", { error })
				}
				request.session.notification = "Comment has been posted successfully"
				response.redirect('/posts/' + post.id)
			})
		})
	})

	return router
}