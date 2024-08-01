import { body, validationResult } from "express-validator";
import UserModel from "../models/userModel.js";

const registerUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3 and 15 characters long")
    .custom(async (value) => {
      const existingUser = await UserModel.findOne({
        where: { username: value },
      });
      if (existingUser) {
        throw new Error("That username already exists");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 100 })
    .withMessage("Email cannot be more than 100 characters")
    .custom(async (value) => {
      const existingEmail = await UserModel.findOne({
        where: { email: value },
      });
      if (existingEmail) {
        throw new Error("That email already exists");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Must have strings")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least a number")
    .matches(/[a-zA-Z]/)
    .withMessage("Password must contain at least a letter"),

  (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return {
        msg,
      };
    });
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default registerUserValidator;
