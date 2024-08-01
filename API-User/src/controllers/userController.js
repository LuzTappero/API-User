import UserModel from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";

class UserController {
  static async getAll(req, res, next) {
    try {
      const allUsers = await UserModel.findAll();
      res.status(200).send(allUsers);
    } catch (error) {
      next(error);
    }
  }
  static async getById(req, res, next) {
    const id = req.params.id;
    try {
      const user = await UserModel.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
  static async registerUser(req, res, next) {
    try {
      const { username, password, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.create({ username, password: hashedPassword, email });
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await UserModel.authenticate(username, password);
      req.session.userId = user.user_id;
      req.session.isLogged = true;
      res.status(201).json({message: 'Login succesfull'})
    } catch (error) {
      console.error("Error during authenticate:", error.message);
      if (error.message === "User not found") {
        res.status(404).send("User not found");
      } else if (error.message === "Incorrect password") {
        res.status(401).send("Incorrect password");
      } else {
        res.status(500).send("Internal server error");
      }
    }
  }
  static async checkAuth(req, res, next) {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const userId = req.session.user;
      const user = await UserModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        isAuthenticated: true,
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async userData(req, res, next) {
    try {
      if (!req.session.userId) {
        res.status(401).json({ message: "Unauthorized" });
      }
      const user = await UserModel.findByPk(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return next(new Error("Error logging out"));
        }
        res.clearCookie("connect.sid", { path: "/" });
        res.status(200).json({ message: "Logout successful" });
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const user_id = req.params.id;
      const user = await UserModel.findByPk(user_id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(req, res, next) {
    try {
      const user_id = req.params.id;
      const { username, password, email } = req.body;
      const user = await UserModel.findByPk(user_id);
      if (!user) {
        throw new Error("User not found");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.update(
        { username, password: hashedPassword, email },
        { where: { user_id } }
      );
      res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
