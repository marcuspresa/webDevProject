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

		getAccountByUsername: function (username, callback) {
			accounts.findOne({
				raw: true,
				where: {
					username: username,
				}
			}).then(function (account) {
				callback(null, account)
			}).catch(function (error) {
				console.log(error)
				callback("No account with specified username ", null)
			})
		},

		getPasswordByUsername: function (username, callback) {

			accounts.findOne({
				raw: true,
				where: { username: username },
			})
				.then(function (account) {
					if (account == null) {
						return callback("No such account exists", null)
					}
					if (!account.password.length) {
						return callback("No password", null);
					} else {
						callback(null, account.password);
					}
				})
				.catch(function (error) {
					console.log(error)
					callback("dbError", null);
				});
		},


		createAccount: function (usernameToCheck, password, callback) {
			accounts.create({ username: usernameToCheck, password: password }).then(function (account) {
				callback(null, account)
			}).catch(function (error) {
				console.log(error)
				callback("could not create account", null)
			})

		}
	}

}

