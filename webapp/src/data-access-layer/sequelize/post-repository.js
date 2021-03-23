const post = require("../models/post-model.js")
const comment = require("../models/comment-model.js")

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
				callback(error, null)
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
					callback("Something went wrong when creating the post", null);
				});
		},

		editPost: function (id, title, body, callback) {
			console.log(body + title + "kommer hit")
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
					callback("Could not delete post", null)
				})
		},


		getPostsWithAccountId: function (id, callback) {
			post.findAll({
				raw: true,
				where: {
					accountId: id
				}
			}).then(function (posts) {
				callback(null, posts)
			}).catch(function (error) {
				console.log(error)
				callback("No posts exist for this account", null)
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
				callback(null, comment)
			}).catch(function (error) {
				callback("No comments exist on this post", null)
			})

		},


		createCommentOnPostId: function (id, commentToPost, usernameThatPosted, accountId, callback) {
			comment.create({ comment: commentToPost, username: usernameThatPosted, accountId: accountId, postid: id })
				.then(function (comment) {
					callback(null, comment)
				}).catch(function (error) {
					console.log(error)
					callback("Could not create comment ", null)
				})
		}

	}
}


