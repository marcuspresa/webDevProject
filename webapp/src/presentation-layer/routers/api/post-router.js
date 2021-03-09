const apiMiddlewares = require("./api-middlewares")
const express = require('express')

module.exports = function ({ postManager }) {
    const router = express.Router()

    router.post("/", apiMiddlewares.extractToken, function (request, response) {
        postManager.createPost(request.tokenString, request.body.title, request.body.body, function (error, createdPost) {
            if (createdPost) {
                response.status(201).json(createdPost)
            } else {
                response.json(error)
            }
        })

    })

    router.get("/", function (request, response) {
        postManager.getAllPosts(function (errors, posts) {
            if (errors.length) {
                response.status(400).end()
            }
            else {
                response.status(200).json(posts)
            }

        })
    })

    router.delete("/:id", apiMiddlewares.extractToken, function (request, response) {
        const id = request.params.id
        postManager.deletePost(id, function (error) {
            if (error.length) {
                response.status(400).end()
            }
            else {
                response.status(200).end()
            }
        })
    })
    router.get("/:id", function (request, response) {
        const id = request.params.id
        postManager.getPostWithId(id, function (errors, post) {
            const accountId = post.accountId
            if (errors.length) {
                response.status(400).end()
            }
            else if (!request.payload || request.payload.accountId != accountId) {
                response.status(401).end()
                return
            }
            else (
                response.status(200).json(post)
            )
        })
    })

    router.put("/:id", apiMiddlewares.extractToken, function (request, response) {
        const id = request.params.id
        const title = request.body.title
        const post = request.body.post
        postManager.getPostWithId(id, function (errors, dbPost) {
            if (errors.length) {
                response.status(400).end()
            }

            else {
                const accountId = dbPost.accountId
                if (!request.payload || request.payload.accountId != accountId) {
                    response.status(401).end()
                    return
                }

                postManager.editPost(post, id, title, function (error) {
                    if (error.length) {
                        response.status(400).end()
                        return
                    }
                    else {
                        response.status(200).end()
                        return
                    }
                })
            }
        })

    })
    
    router.get("/:id/posts", function (request, response) {
		const accountId = request.payload.accountId
		postManager.getPostsWithAccountId(accountId, function (error, posts) {
			if (error.length) {
				response.status(400).end()
			}
			else {
				response.status(200).json(posts)
			}
		})

	})

    return router
}
