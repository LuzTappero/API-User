import express from "express";
import UserController from "../controllers/userController.js";
import registerUserValidator from "../middlewares/UserValidator.js";
import { authenticateToken } from "../middlewares/AuthToken.js";
const userRoutes = express.Router();


userRoutes.get("/", UserController.getAll);
userRoutes.get("/id/:id", UserController.getById);

// userRoutes.get("/userData", authenticateToken, UserController.userData);
userRoutes.get("/checkAuth",authenticateToken, UserController.checkAuth);

userRoutes.post(
  "/register",
  registerUserValidator,
  UserController.registerUser
);
userRoutes.post("/login", UserController.login);
userRoutes.post("/logout", UserController.logout);

userRoutes.delete("/:id", UserController.deleteUser);
userRoutes.patch("/:id", UserController.updateUser);

export default userRoutes;
