const sequelize = require("../sequelize/db.js")
const { DataTypes } = require("sequelize");

const Account = sequelize.define("accounts", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

module.exports = Account