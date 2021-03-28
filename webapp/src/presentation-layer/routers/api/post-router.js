const apiMiddlewares = require("./api-middlewares")
const express = require('express')

module.exports = function ({ postManager }) {
    const router = express.Router()

    router.post("/new-post", apiMiddlewares.authenticate, function (request, response) {
        if (!request.payload) {
            response.status(401).end()
        } else {
            postManager.createPost(request.body.title, request.body.body, request.body.username, request.body.accountId, function (error, createdPost) {
                if (createdPost) {
                    response.status(201).json(createdPost)
                } else {
                    response.status(500).json(error)
                }
            })
        }
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
        if (!request.payload) {
            response.status(401).end()
        } else {
            postManager.deletePost(request.payload.accountId, id, function (error) {
                if (error != null) {
                    response.status(400).json(error)
                }
                else {
                    response.status(200).end()
                }
            })
        }
    })

    router.get("/your-posts/:id", apiMiddlewares.authenticate, function (request, response) {
        const id = request.params.id
        if (!request.payload) {
            response.status(401).end()
        } else {
            postManager.getPostsWithAccountId(id, function (errors, post) {
                if (errors != null) {
                    response.status(400).end()
                }
                else (
                    response.status(200).json(post)
                )
            })
        }

    })
    router.get("/your-post/:id", apiMiddlewares.authenticate, function (request, response) {
        const id = request.params.id
        if (!request.payload) {
            response.status(401).end()
        } else {
            postManager.getPostWithPostID(id, function (errors, post) {
                if (errors != null) {
                    response.status(500).end()
                } else {
                    if (request.payload.accountId != post.accountId) {
                        response.status(401).end()
                    } else {
                        response.status(200).json(post)
                    }

                }

            })
        }
    })
    router.put("/edit/:id", apiMiddlewares.authenticate, function (request, response) {
        const id = request.params.id
        const title = request.body.title
        const body = request.body.body
        const accountID = request.body.accountId
        if (!request.payload) {
            response.status(401).end()
        } else {
            postManager.editPost(body, id, title, accountID, function (error) {
                if (error != null) {
                    if(error == "Not your post"){
                        response.status(401).end()
                    }
                    response.status(400).end()
                }
                else {
                    response.status(200).end()
                }
            })
        }

    })
    return router
}
