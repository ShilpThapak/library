import sequelize from "./db.js";
import { DataTypes } from '@sequelize/core';

const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  born_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

export default Author;