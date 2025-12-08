import express from "express";
import User from "../models/User.js";
import UserService from "../services/UserService.js";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();
const userService = new UserService(User); 
const authController = new AuthController(userService); 

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;