const Sequelize = require('sequelize')

const sequelize = new Sequelize('webAppDatabase', 'root', 'theRootPassword', {
	host: '192.168.99.100',
	//host: 'database',
	dialect: 'mysql',
	define: {
		timestamps: false
	},

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
})


module.exports = sequelize