"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbcon_1 = require("../config/dbcon");
class Book extends sequelize_1.Model {
}
Book.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    title: { type: sequelize_1.DataTypes.STRING(100) },
    author: { type: sequelize_1.DataTypes.STRING(50) },
    publishedYear: { type: sequelize_1.DataTypes.INTEGER, validate: { len: [4, 4] } },
    genres: { type: sequelize_1.DataTypes.JSONB },
    stock: { type: sequelize_1.DataTypes.INTEGER, validate: { len: [0, 6] } },
}, {
    sequelize: dbcon_1.dbCon,
    modelName: 'books',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
exports.default = Book;
