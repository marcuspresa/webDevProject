const post = require("../models/post-model.js")
const comment = require("../models/comment-model.js")
const Sequelize = require('sequelize')

module.exports = function () {
	return {
		getPostWithPostID: function (id, callback) {
			post.findOne({
				raw: true,
				where: {
					id: id
				}
			}).then(function (post) {
				callback(null, post)
			}).catch(function (error) {
				callback("No post with given id", null)
			})
		},

		getAllPosts: function (callback) {
			post.findAll({ raw: true }).then(function (allPosts) {
				callback(null, allPosts)
			}).catch(function (error) {
				callback("Could not get all posts", null)
			})
		},

		createPost: function (title, body, username, accountId, callback) {
			post.create({
				title: title,
				body: body,
				username: username,
				accountId: accountId
			})
				.then(function (createdPost) {
					callback(null, createdPost.id);
				})
				.catch(function (error) {
					callback(["Something went wrong when creating the post"], null);
				});
		},

		editPost: function (body, id, title, callback) {
			post.update(
				{
					body: body,
					title: title
				},
				{
					where: {
						id: id
					}
				}).then(function () {
					callback(null, id)
				}).catch(function (error) {
					callback("Could not edit post", null)
				})
		},

		deletePost: function (id, callback) {
			post.destroy(
				{
					where: {
						id: id
					}

				}).then(function () {
					callback(null, id)
				}).catch(function (error) {
					callback("Could not delete post")
				})
		},


		getPostsWithAccountId: function (id, callback) {
			getPostsForAccountId(id, function (error, posts) {
				callback(error, posts)
			})
		},


		getCommentsWithPostId: function (id, callback) {
			comment.findAll({
				raw: true,
				where: {
					postid: id
				}
			}).then(function (comment) {
				console.log("Comment: " + comment)
				callback([], comment)
			}).catch(function (error) {
				console.log(error)
				callback(["databaseError"], null)
			})

		},


		createCommentOnPostId: function (id, commentToPost, usernameThatPosted, callback) {
			comment.create({ comment: commentToPost, username: usernameThatPosted, postid: id })
				.then(function (comment) {
					callback(null, comment)
				}).catch(function (error) {
					console.log(error)
					callback("Could not create comment ", null)
				})
		}

	}
}


