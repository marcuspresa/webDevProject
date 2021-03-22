const sequelize = require("../sequelize/db.js")
const Post = require("./post-model")
const Accounts = require("./account-model")
const { DataTypes } = require("sequelize");

const Comment = sequelize.define('comments', {
    comment: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    postid: {
        type: DataTypes.CHAR,
        allowNull: false,
        references: 'posts',
        onDelete: 'cascade',
        referencesKey: 'id'
    },
    username : {
        type: DataTypes.CHAR,
        allowNull: false,
        references: 'accounts',
        referencesKey: 'username',
        onDelete: 'cascade' 
    }
    
})


module.exports = Comment