module.exports = function ({ db }) {
    return {

        getAllAccounts: function (callback) {
            const query = `SELECT * FROM accounts ORDER BY username`

            db.query(query, callback)

        },

        getPasswordByUsername: function (username, callback) {
            const query = `SELECT password FROM accounts WHERE username = ? `

            db.query(query, [username], (error, response) => {
                console.log(response)
               if (error) return callback(error, null)
               if(response && response.length >= 1 && response[0].password) {
                    return callback(null, response[0].password)
                }
                else {
                    callback()
                }
            })

        },

        getAccountByUsername: function (username, callback) {
            const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
            db.query(query, [username], (error, response) => {
                if (error) return callback(error, null)
                if (response && response.length >= 1) {
                    console.log(response[0] + "ACCOUNT")
                    return callback(null, response[0])
                }
                else {
                    callback()
                }
            })


        },
        createAccount: function (username, password, callback) {
            const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`

            db.query(query, [username, password], (error, response) => {
                if (error) return callback(error, null)
                if (response && response.length >= 1) {
                    return callback(null, response)
                }
                else {
                    callback()
                }
            })

        }
    }

}


