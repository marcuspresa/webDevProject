const post = require("../models/post-model.js")
const comment = require("../models/comment-model.js")

module.exports = function () {
	return {
		getPostWithPostID: function(id, callback) {
			post.findOne({
				where: {
					id: id
				}
			}).then(function (post) {
				callback(null, post)
			}).catch(function (error) {
				callback("No post with given id" + id, null)
			})
		},
		/*getPostsWithAccountId(accountId) {
			post.findOne({
				where: {
					id: accountId
				},
				raw: true
			}).then(function (posts) {
				callback(null, posts)
			}).catch(function (error) {
				callback("No posts for given account id" + id, null)
			})
		
		},*/

		getAllPosts: function (callback) {
			post.findAll({ raw: true }).then(function (allPosts) {
				callback(null, allPosts)

			}).catch(function (error) {
				callback("Could not get all posts", null)
			})
		},

		createPost: function (title, post, username, accountId, callback) {
			post.create({ title: title, post: post, username: username, accountId: accountId }).then(function (createdPost) {
				callback(null, createdPost)
			}).catch(function (error) {
				callback("could not create post", null)
			})

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

	
		getCommentsWithPostId: function(id, callback) {
			console.log("HIT")
			comment.findAll({
				where : {
					postid : id
				}
			}).then(function(comment){
				console.log("Comment: " + comment)
				callback([], comment)
			}).catch(function(error){
				console.log(error)
				callback(["databaseError"],null)
			})

		  },
	  

		commentOnPostWithPostId: function (id, commentToPost, usernameThatPosted, callback) {
			comment.create({ comment: commentToPost, username: usernameThatPosted, postId: id })
				.then(function (comment) {
					callback(null, comment)
				}).catch(function (error) {
					callback("Could not create comment ", null)
				})
		}

	}
}


