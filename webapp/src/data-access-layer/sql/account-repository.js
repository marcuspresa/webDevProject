module.exports = function ({ db }) {
    return {

        /*
            Get all accounts.
        */

        getPasswordByUsername: function (username, callback) {
            const query = `SELECT password FROM accounts WHERE username = ? `

            db.query(query, [username], (error, response) => {
               if (error) return callback(error, null)
               if(response && response.length >= 1 && response[0].password) {
                    return callback(null, response[0].password)
                }
                else {
                    callback('Unknown error', null)
                }
            })

        },

        getAccountByUsername: function (username, callback) {
            const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
            db.query(query, [username], (error, response) => {
                if (error) callback(error, null)
                else if (response && response.length >= 1) {
                    callback(null, response[0])
                } else {
                    callback('Unknown error', null)
                }
            })


        },
        createAccount: function (username, password, callback) {
            const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
            db.query(query, [username, password], (error, response) => {
                if (error) callback(error, null)
                else if (response && response.affectedRows > 0) {
                    this.getAccountByUsername(username, function(error, account){
                        callback(error, account)
                    })
                } else {
                    callback('Unkown error', null)
                }
            })

        }
    }

}


