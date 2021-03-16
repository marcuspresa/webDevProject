const sequelize = require("../sequelize/db.js")
const Account = require("./account-model")
const { DataTypes } = require("sequelize");

const Post = sequelize.define("posts", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Post.belongsTo(Account)

module.exports = Post 