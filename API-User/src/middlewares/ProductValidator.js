import { validator } from "sequelize/lib/utils/validator-extras";
import { body, validationResult } from "express-validator";

const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string")
    .isLength({ max: 100 })
    .withMessage("Product name cannot be more than 100 characters")
    .custom(async (value) => {
      const existingProduct = await ProductModel.findOne({
        where: { productName: value },
      });
      if (existingProduct) {
        throw new Error("Product name already exists");
      }
    }),
  body("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isString()
    .withMessage("Product category must be a string")
    .isLength({ max: 50 })
    .withMessage("Product category cannot be more than 50 characters"),
  body("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ gt: 0 })
    .withMessage("Product price must be a number greater than 0"),
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

export default validateProduct;
