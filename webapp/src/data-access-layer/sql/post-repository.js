module.exports = function ({ db }) {
    return {

        getAllPosts: function (callback) {
            const query = "SELECT * FROM posts"
            db.query(query, callback)
        },

        createPost: function (title, body, username, accountId, callback) {
            const query = "INSERT INTO posts (title, body, username, accountId) VALUES (?,?,?,?)"
            const values = [title, body, username, accountId]

            db.query(query, values, function (error, result) {
                if (error) {
                    callback(error, null)
                } else {
                    callback(null, result.insertId)
                }

            })
        },

        editPost: function (id, title, body, callback) {

            const query = "UPDATE posts SET body = ?, title = ? WHERE id = ?"
            const values = [body, title, id]
            db.query(query, values, function (error, result) {
                if (error) {
                    callback(error, null)
                } else {
                    callback(null, result.changedRows)
                }
            })
        },

        deletePost: function (id, callback) {
            const query = "DELETE FROM posts WHERE id = ?"
            const values = [id]
            db.query(query, values, function (error, result) {
                if (error) {
                    callback(error, null)
                } else {
                    callback(null, result.affectedRows)
                }
            })
        },

        getPostWithPostID: function (id, callback) {

            const query = "SELECT * FROM posts WHERE id = ?"

            db.query(query, id, function (error, result) {
                if (error) {
                    callback(error, null)
                }
                callback(null, result.length > 0 ? result[0] : null)
            })
        },

        getPostsWithAccountId: function (id, callback) {

            const query = "SELECT * FROM posts WHERE accountId = ?"

            db.query(query, id, function (error, result) {
                if (error) {
                    callback(error, null)
                }
                callback(null, result)
            })

        },


        getCommentsWithPostId: function (id, callback) {

            const query = "SELECT * FROM comments WHERE postId = ?"

            db.query(query, id, function (error, result) {
                if (error) {
                    callback(error, null)
                }
                callback(null, result)
            })
        },


        createCommentOnPostId: function (id, comment, username, accountId, callback) {

            const query = "INSERT INTO comments (comment, postId, username, accountId) VALUES (?,?,?,?)"
            const values = [comment, id, username, accountId]

            db.query(query, values, function (error) {
                if (error) {
                    callback(error, null)
                }
                else {
                    callback(null)
                }
            })
        }

    }
}
