import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Τιμή με δεκαδικά
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING
  }
});

export default Product;