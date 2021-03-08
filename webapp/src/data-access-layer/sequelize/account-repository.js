const accounts = require("../models/account-model.js")

function getAccount(username, callback) {
	accounts.findOne({
		where: {
			username: usernameToFind,
		}
	}).then(function (account) {
		
		callback(null, account)
	}).catch(function (error) {
		callback("No account with specified username " + username, null)
	})
}

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

		getPasswordByUsername: function (usernameToCheck, callback) {

			getAccount(usernameToCheck, function (error, account) {		
				callback(error, account.password)
			})

		},


		getAccountByUsername: function (usernameToFind, callback) {

			getAccount(usernameToFind, function (error, account) {			
				callback(error, account)
			})


		},


		createAccount: function (username, password, callback) {

			getAccount(usernameToCheck, function (error, account) {
				accounts.create({ username: username, password: password }).then(function (createdAccount) {
					callback(null, createdAccount)

				}).catch(function (error) {
					callback("could not create account", null)
				})

			})

		}
	}

}

