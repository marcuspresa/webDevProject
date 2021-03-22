const sequelize = require("../sequelize/db.js")
const Account = require("./account-model")
const { DataTypes } = require("sequelize");

const Post = sequelize.define("posts", {
    title : {
        type: DataTypes.CHAR,
        allowNull: false
    },
    body: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    username: {
        type: DataTypes.CHAR,
        allowNull: false
    }
    
})

Post.belongsTo(Account)

module.exports = Post