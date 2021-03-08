const postRepository = require("../data-access-layer/sql/post-repository")

module.exports = function ({ postRepository, accountValidator }) {
	return {

		getAllPosts: function (callback) {
			postRepository.getAllPosts(function (error, result) {
				if (error) {
					callback(new Error("Could not get all posts"), null)
				}
				else {
					callback(null, result)
				}
			})

		},

		createPost: function (token, title, body, callback) {
			accountValidator.validateToken(token, function (tokenError, payload) {
				if (tokenError)
					return callback("invalid token", null)
				if(!title || title.length == 0) return callback("Title cannot be empty", null)
				if(!body || body.length == 0) return callback("Body cannot be empty", null)
				if (payload) {
					postRepository.createPost(title, body, payload.username, payload.sub, callback)
				}
			})
		},

		
		getCommentsWithPostId: function (id, callback) {
			postRepository.getCommentsWithPostId(id, callback)
		},

		createCommentOnPostId: function (id, comment, username, callback) {
			if (username == null && comment == null) {
				return callback(new Error("Could not create comment"), null)
			}
			else {
				postRepository.createCommentOnPostId(id, comment, username, callback)
			}
		},

		editPost: function (token, id, title, body, callback) {
			accountValidator.validateToken(token, function (tokenError, payload) {
				if (tokenError)
					return callback("invalid token", null)

				if (payload) {
					postRepository.getPost(id, function (error, checkPost) {
						if (error)
							return callback(error, null)

						if (checkPost.accountId == payload.sub) {
							postRepository.editPost(id, title, body, callback)
						} else {
							callback("Not your post", null)
						}

					})
				}

			})
		},

		deletePost: function (token, id, callback) {
			accountValidator.validateToken(token, function (tokenError, payload) {
				if (tokenError)
					return callback("invalid token", null)

				if (payload) {
					postRepository.getPost(id, function (error, checkPost) {
						if (error)
							return callback(error, null)

						if (checkPost.accountId == payload.sub) {
							postRepository.deletePost(id, callback)
						} else {
							callback("Not your post", null)
						}

					})
				}

			})

		},

		getPostIfOwner: function (token, id, callback) {
			accountValidator.validateToken(token, function (tokenError, payload) {
				if (tokenError)
					return callback("invalid token", null)

				if (payload) {
					postRepository.getPost(id, function (error, checkPost) {
						if (error)
							return callback(error, null)

						if (checkPost.accountId == payload.sub) {
							callback(null, checkPost)
						} else {
							callback("Not your post", null)
						}

					})
				}

			})

		},

		getPost: function (id, callback) {
			postRepository.getPost(id, function(error, post){
				if(error) return callback(error, null)
				if(!post) return callback("No post with id " + id, null)
				callback(null, post)
			})
		},

		getPostsWithAccountId: function (id, callback) {
			postRepository.getPostsWithAccountId(id, callback)
		},

	}
}