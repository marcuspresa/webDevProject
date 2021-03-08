const express = require('express')


module.exports = function ({postManager, commentManager}) {
	const router = express.Router()
	
	router.use(express.urlencoded({ extended: false }))

	router.get("/", function (request, response) {
		const model = {
			account: request.session.account,
			login: request.session.login
		}
		response.render("home.hbs", model)
	})

	router.get("/new-post", function (request, response) {
		if(request.session.login == true){
			response.render("new-post.hbs", {login: request.session.login})
		}
		else{
			response.redirect("/accounts/sign-in")
		}
		
	})

	return router
}