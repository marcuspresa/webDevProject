const MIN_USERNAME_LENGTH = 3
const MIN_PASSWORD_LENGTH = 6
const bcrypt = require('bcryptjs')


module.exports = function ({ accountRepository }) {
	return {
		getErrorsNewAccount: function (username, password, callback) {
			var errors = []
			if (username.length < MIN_USERNAME_LENGTH) {
				errors.push("username must be atleast 3 symbols")
			}
			else if (password.length < MIN_PASSWORD_LENGTH) {
				errors.push("password must be atleast 6 symbols")
			}

			accountRepository.getAccountByUsername(username, function (error, account) {
				if (account) {
					errors.push("username already exists")
				}
				callback(errors.length > 0 ? errors : null)
			})
		},

		checkCredentials: function (username, password, callback) {
			accountRepository.getPasswordByUsername(username, function (error, hash) {
				if (error != null) {
					callback(error, null)
				}
				else {
					bcrypt.compare(password, hash, function (bcryptError, result) {
						if (result) {
							accountRepository.getAccountByUsername(username, callback)
						}
						else {
							callback("Wrong credentials", null)
						}
					})
				}

			})
		}
	}
}