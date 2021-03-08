const express = require('express')

module.exports = function ({ postManager, commentManager }) {
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

	router.get("/:id/edit", function (request, response){
		const token = request.session.token
		const id = request.params.id
		if (!request.session.login) 
			return response.redirect("/accounts/sign-in")
		
		postManager.getPostIfOwner(token, id, function(error, post) {
			const model = {
				login: request.session.login
			}
			response.render("edit-post.hbs", {post: post, error: error}, model)	
		})
		
	})

	router.post("/:id/edit", function (request, response) {
		const title = request.body.title
		const body = request.body.body
		const token = request.session.token
		const id = request.params.id
		postManager.editPost(token, id, title, body, function (error, editedPost) {
			const model = {
				editedPost: error ? false : true,
				post: editedPost,
				login: request.session.login,
				error: error
			}
			response.render("edit-post.hbs", model)
		})

	})

	router.post("/:id/delete", function (request, response) {
		const token = request.session.token
		const id = request.params.id
		postManager.deletePost(token, id, function (error, deleted) {
			const model = {
				login: request.session.login
			}
			if (error)
				return response.render("post.hbs", { error: error }, model)

			response.redirect("/posts")
		})

	})

	router.post("/new", function (request, response) {

		const title = request.body.title
		const body = request.body.body
		const token = request.session.token
		postManager.createPost(token, title, body, function (error, newPost) {
			console.log(newPost + "APA")
			const model = {
				newPost: newPost,
				login: request.session.login,
				error: error
			}
			response.render("posts.hbs", model)
		})

	})

	router.get("/:id", function (request, response) {
		const id = request.params.id
		postManager.getPost(id, function (error, post) {
			if(error){
				return response.render('post.hbs', {error: error})
				
			}
			postManager.getCommentsWithPostId(id, function(error, comments){
				const model = {
					post: post,
					comments: comments,
					error: error,
					login: request.session.login,
					account: request.session.account,
					isOwner: post.accountId == request.session.account.id //ibland fungerar denna inte. Den hittar inte account id
				}
				response.render("post.hbs", model)
			})
		})
	})

	router.post("/:id", function (request, response) {

		const id = request.params.id
		const comment = request.body.comment
		console.log(comment) 
		postManager.getPost(id, function (error, post) {
			postManager.createCommentOnPostId(id, comment, request.session.account.username, function (error) {
				const model = {
					error: error,
					post: post,
					login: request.session.login,
					account: request.session.account
				}
				response.render('post.hbs', model)
			})
		})
	})

	return router
}