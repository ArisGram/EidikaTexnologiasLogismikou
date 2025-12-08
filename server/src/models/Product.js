import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING, // Link φωτογραφίας
    defaultValue: "https://via.placeholder.com/300" // Μια τυχαία εικόνα αν δεν βάλουμε εμείς
  },
  category: {
    type: DataTypes.STRING
  }
});

export default Product;