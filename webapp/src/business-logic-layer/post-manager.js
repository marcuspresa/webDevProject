
module.exports = function ({ postRepository, accountValidator }) {
	return {

		getAllPosts: function (callback) {
			postRepository.getAllPosts(function (error, posts) {
				if (error) {
					callback(new Error("Could not get all posts"), null)
				}
				else {
					callback(null, posts)
				}
			})

		},

		createPost: function (title, body, username, accountId, callback) {
			if (!title || title.length == 0) return callback("Title cannot be empty", null)
			if (!body || body.length == 0) return callback("Body cannot be empty", null)
			if (!username || username.length == 0) return callback("username cannot be empty", null)
			if (!accountId || accountId.length == 0) return callback("accountId cannot be empty", null)
			postRepository.createPost(title, body, username, accountId, callback)
		},

		getCommentsWithPostId: function (id, callback) {
			postRepository.getCommentsWithPostId(id, callback)
		},

		createCommentOnPostId: function (id, comment, username, accountId, callback) {
			console.log("apa2" + accountId)
			if (username == null && comment == null) {
				return callback(new Error("Could not create comment"), null)
			}
			else {
				postRepository.createCommentOnPostId(id, comment, username, accountId, callback)
			}
		},

		editPost: function (body, id, title, accountID, callback) {
			postRepository.getPostWithPostID(id, function (error, checkPost) {
				if (error != null){
					return callback(error, null)
				}
				if (checkPost.accountId == accountID) {
					postRepository.editPost(id, title, body, callback)
				} else {
					callback("Not your post", null)
				}

			})

		},

		deletePost: function (accountId, id, callback) {
			postRepository.getPostWithPostID(id, function (error, checkPost) {
				if (error)
					return callback(error, null)
				if (checkPost.accountId == accountId) {
					postRepository.deletePost(id, callback)
				} else {
					callback("Not your post", null)
				}

			})

		},

		getPostWithPostID: function (id, callback) {
			postRepository.getPostWithPostID(id, function (error, post) {
				if (error) return callback(error, null)
				if (!post) return callback("No post with id " + id, null)
				callback(null, post)
			})
		},
		getPostsWithAccountId: function (id, callback) {
			postRepository.getPostsWithAccountId(id, callback)
		},

	}
}