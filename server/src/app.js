import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import UserService from "./services/UserService.js";
import ProductService from "./services/ProductService.js";
import AuthController from "./controllers/AuthController.js";
import ProductController from "./controllers/ProductController.js";

const app = express();
app.use(cors());
app.use(express.json());

const userService = new UserService(User);   // Το Service παίρνει το Model
const authController = new AuthController(userService); // Ο Controller παίρνει το Service
const productService = new ProductService(Product);
const productController = new ProductController(productService);

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);

app.post("/api/products", productController.create);
app.get("/api/products", productController.getAll);

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("DB connected & Synced!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB Connection Error:", err));