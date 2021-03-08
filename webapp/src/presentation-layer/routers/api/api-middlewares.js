const accountValidator = require("../../../business-logic-layer/account-validator")


exports.authenticate = function (req, res, next) {
    try {
        const authorizationHeader = req.get("Authorization")
        if (!authorizationHeader)
            throw new Error("No authorization header")
        const accessTokenString = authorizationHeader.substr("Bearer ".length)
        accountValidator.validateToken(accessTokenString, function (error, payload) {
            if (error)
                throw error

            req.tokenPayload = payload
            next()
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}


exports.extractToken = function (req, res, next) {
    try {
        const authorizationHeader = req.get("Authorization")
        if (!authorizationHeader)
            throw new Error("No authorization header")
        const accessTokenString = authorizationHeader.substr("Bearer ".length)
        if(accessTokenString.length>0){
            req.tokenString = accessTokenString
            next()
        }else{
            throw new Error("No access token provided")
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}