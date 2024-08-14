const { DataTypes } = require('sequelize');
const { dbCon: db } = require('../config/dbcon');

module.exports = db.define('books', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: { type: DataTypes.STRING(100) },
  author: { type: DataTypes.STRING(50) },
  publishedYear: { type: DataTypes.INTEGER },
  genres: { type: DataTypes.TEXT() },
  stock: { type: DataTypes.INTEGER },
}, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});