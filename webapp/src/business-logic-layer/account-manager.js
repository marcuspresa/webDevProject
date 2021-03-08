const bcrypt = require('bcryptjs')
const saltRounds = 10
const jwt = require("jsonwebtoken")
const JWT_SECRET = "5kRh21AucYhm3but2s67jEIWSy1mJekN"

module.exports = function ({accountRepository,accountValidator}) {
	return {
		getAllAccounts: function (callback) {
			accountRepository.getAllAccounts(callback)
		},

		getAccountByUsername: function (username, callback) {
			accountRepository.getAccountByUsername(username, function (error, account) {
				callback(error, account)
			})
		},

		generateToken: function (username, callback) {
			accountRepository.getAccountByUsername(username, function (error, account) {
				if (error)
					return callback(error, null)

				jwt.sign({
					sub: account.id,
					username: username
				}, JWT_SECRET, { algorithm: 'HS256' }, callback)

			})
		},

		createAccount: function (username, password, callback) {

			accountValidator.getErrorsNewAccount(username, password, function (errors) {
				if (errors) {
					callback(errors, null)
				} else {
					bcrypt.hash(password, saltRounds, function (err, hash) {
						accountRepository.createAccount(username, hash, function (error, account) {
							callback(error ? [error] : null, account)
						})
					})
				}
			})
		},
	}
}