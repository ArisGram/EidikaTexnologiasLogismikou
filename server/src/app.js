import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js"; 
import OrderItem from "./models/OrderItem.js";
import UserService from "./services/UserService.js";
import ProductService from "./services/ProductService.js";
import OrderService from "./services/OrderService.js";
import AuthController from "./controllers/AuthController.js";
import ProductController from "./controllers/ProductController.js";
import OrderController from "./controllers/OrderController.js";

const app = express();
app.use(cors());
app.use(express.json());

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

const userService = new UserService(User);
const authController = new AuthController(userService);
const productService = new ProductService(Product);
const productController = new ProductController(productService);
const orderService = new OrderService(Order, OrderItem, Product);
const orderController = new OrderController(orderService);

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.post("/api/products", productController.create);
app.get("/api/products", productController.getAll);
app.put("/api/products/:id", productController.update);
app.post("/api/orders", orderController.create);
app.get("/api/orders", orderController.getMyOrders);
app.get("/api/products/:id", productController.getOne);

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("DB connected & Synced!");
    app.listen(PORT, () => console.log("Server running on port ${PORT}"));
  })
  .catch((err) => console.error("!!DB Connection Error:", err));