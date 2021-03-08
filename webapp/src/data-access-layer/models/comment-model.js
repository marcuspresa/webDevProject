const sequelize = require("../sequelize/db.js")
const Post = require("./post-model")
const { DataTypes } = require("sequelize");

const Comment = sequelize.define("comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Comment.belongsTo(Post)
Post.hasMany(Comment)

module.exports = Comment