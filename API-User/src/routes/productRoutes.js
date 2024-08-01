import express from 'express'
const productRoutes= express.Router();
import ProductController from '../controllers/productController.js';

productRoutes.get('/',ProductController.getAll);
productRoutes.get('/:id',ProductController.getById)
productRoutes.get('/name/:name', ProductController.getByName)
productRoutes.get('/category/:category', ProductController.getByCategory)
productRoutes.get('/:price')

productRoutes.post('/create',)

productRoutes.delete('/:id', )
productRoutes.patch('/:id', )


export default productRoutes;