import ProductModel from "../models/productModel.js";

class ProductController {
  static async getAll(req, res, next) {
    try {
      const products = await ProductModel.findAll();
      res.status(200).json({ message: "Get all products", products });
    } catch (error) {
      next(error);
    }
  }
  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const product = await ProductModel.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Get products by Id ", product });
    } catch (error) {
      next(error);
    }
  }
  static async getByName(req, res, next) {
    const name = req.params.name;
    try {
      const product = await ProductModel.findOne({ where: { name } });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(201).json({ message: "Get products by name ", name });
    } catch (error) {
      next(error);
    }
  }
  static async getByCategory(req, res, next) {
    const category_id = parseInt(req.params.id);
    try {
      const product = await ProductModel.findOne({ where: { category_id } });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(201).json({ message: "Get products by category ", product });
    } catch (error) {
      next(error);
    }
  }
  static async getByPrice(req, res, next) {
    const price = req.params.price;
    try {
      const product = await ProductModel.findOne({ where: { price } });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(201).json({ message: "Get products by price ", product });
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { name, description, price,imagePath, category_id} = req.body;
      await ProductModel.create({
        name,
        description,
        price,
        imagePath,
        category_id
      });
      return res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const product = await ProductModel.findByPk(id)
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      await product.destroy();
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price,imagePath, category_id} = req.body;
      await ProductModel.updateUser({
        id,
        newData: { name, description, price, imagePath, category_id },
      });
      res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  }
}
export default ProductController;
