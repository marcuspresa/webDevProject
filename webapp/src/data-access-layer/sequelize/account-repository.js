const accounts = require("../models/account-model.js")

module.exports = function ({ }) {
	return {

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
					callback("Database error", null);
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

