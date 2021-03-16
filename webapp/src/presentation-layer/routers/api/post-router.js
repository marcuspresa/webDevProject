const apiMiddlewares = require("./api-middlewares")
const express = require('express')

module.exports = function ({ postManager }) {
    const router = express.Router()

    router.post("/new-post", apiMiddlewares.authenticate, function (request, response) {
        /**
         * Här skickar jag användares användarnamn och ID m.h.a idTOKEN,
         * Vet inte om man måste checka här gentemot PAYLOAD ID:T det får du kolla på
         */
        postManager.createPost(request.body.title, request.body.body, request.body.username, request.body.accountId, function (error, createdPost) {
            if (createdPost) {
                response.status(201).json(createdPost)
            } else {
                response.json(error)
            }
        })

    })

    router.get("/", function (request, response) {
        postManager.getAllPosts(function (errors, posts) {
            if (errors != null) {
                response.status(400).end()
            }
            else {
                response.status(200).json(posts)
            }
        })
    })

    router.delete("/delete/:id", apiMiddlewares.authenticate, function (request, response) {
        const id = request.params.id
        /**
         * Här används payload account ID tror inte det görs rätt
         */
        if (request.payload != null) {
            postManager.deletePost(request.payload.accountId, id, function (error) {
                if (error != null) {
                    response.status(400).end()
                }
                else {
                    response.status(200).end()
                }
            })
        } else {
            response.status(400).end()
        }
    })

    router.get("/your-posts/:id", apiMiddlewares.authenticate, function (request, response) {
        const id = request.params.id
        postManager.getPostsWithAccountId(id, function (errors, post) {
            const accountId = post.accountId
            if (errors != null) {
                response.status(400)
            }
            else (
                response.status(200).json(post)
            )
        })
    })
	router.get("/your-post/:id",apiMiddlewares.authenticate, function (request, response) {
		const id = request.params.id
		postManager.getPostWithPostID(id, function (errors, post) {
			if (errors != null) {
				response.status(500).end()
			} else {
				if (request.payload.accountId != post.accountId) {
					response.status(401).end()
					return
				} else {
					response.status(200).json(post)
				}

			}

		})
	})
    router.put("/:id", apiMiddlewares.authenticate, function (request, response) {
        const id = request.params.id
        const title = request.body.title
        const post = request.body.post
        const accountID = request.body.accountId

    })


    return router
}
