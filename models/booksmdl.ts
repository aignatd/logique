import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { dbCon as db } from '../config/dbcon';
import { Json } from 'sequelize/types/utils';

class Book extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public publishedYear!: number;
  public genres!: Json;
  public stock!: number;
}

Book.init({
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
  sequelize: db,
  modelName: 'books',
  freezeTableName: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Book;