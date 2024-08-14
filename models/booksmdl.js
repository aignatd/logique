const { DataTypes } = require('sequelize');
const { dbCon: db } = require('../config/dbcon');

module.exports = db.define('books', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: { type: DataTypes.STRING(100) },
  author: { type: DataTypes.STRING(50) },
  publishedYear: { type: DataTypes.INTEGER, validate: { len: [4, 4] }},
  genres: { type: DataTypes.JSONB },
  stock: { type: DataTypes.INTEGER, validate: { len: [0, 6] }},
}, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});