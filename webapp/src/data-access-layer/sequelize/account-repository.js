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
				.then(function(account) {
				  if (!account.password.length) {
					callback(["No password"], null);
				  } else {
					callback(null, account.password);
				  }
				})
				.catch(function(error) {
					console.log(error)
				  callback(["dbError"], null);
				});
		},


		createAccount: function (usernameToCheck, password, callback) {

			this.getAccountByUsername(usernameToCheck, function (error, account) {
				accounts.create({ username: usernameToCheck, password: password }).then(function (account) {
					callback(null, account)

				}).catch(function (error) {
					console.log(error)
					callback("could not create account", null)
				})

			})

		}
	}

}

