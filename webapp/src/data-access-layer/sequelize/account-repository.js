const accounts = require("../models/account-model.js")

module.exports = function ({ }) {
	return {
		getAllAccounts: function (callback) {

			accounts.findAll({
				order: [
					['username', 'DESC']
				]
			}).then(function (accounts) {
				callback(null, accounts)
			}).catch(function (error) {
				callback(error, null)
			})

		},
		getAccount: function (username, callback) {
			accounts.findOne({
				where: {
					username: username,
				}
			}).then(function (account) {
				
				callback(null, account)
			}).catch(function (error) {
				callback("No account with specified username " + username, null)
			})
		},
		
		getPasswordByUsername: function (usernameToCheck, callback) {

			this.getAccount(usernameToCheck, function (error, account) {		
				callback(error, account.password)
			})

		},


		getAccountByUsername: function (usernameToFind, callback) {

			this.getAccount(usernameToFind, function (error, account) {			
				callback(error, account)
			})


		},


		createAccount: function (usernameToCheck, password, callback) {

			this.getAccount(usernameToCheck, function (error, account) {
				accounts.create({ username: usernameToCheck, password: password }).then(function (account) {
					callback(null, account)

				}).catch(function (error) {
					callback("could not create account", null)
				})

			})

		}
	}

}

