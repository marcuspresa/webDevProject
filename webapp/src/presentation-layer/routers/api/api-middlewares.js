const { request } = require("express")
const jwt = require("jsonwebtoken")
const jwtSecret = "5kRh21AucYhm3but2s67jEIWSy1mJekN"

exports.extractToken = function (request, response, next) {
    try {
        const authorizationHeader = request.get("Authorization")
        if (!authorizationHeader)
            throw new Error("No authorization header")
        const accessTokenString = authorizationHeader.substr("Bearer ".length)
        if (accessTokenString.length > 0) {
            request.tokenString = accessTokenString
            next()
        } else {
            throw new Error("No access token provided")
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}


exports.authenticate = function (request, response, next) {
    try {
        const authorizationHeader = request.get("Authorization")
        if (!authorizationHeader)
            throw new Error("No authorization header")
        const accessTokenString = authorizationHeader.substr("Bearer ".length)
        request.payload = jwt.verify(accessTokenString, jwtSecret)
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

