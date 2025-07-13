import express from 'express';
import {
  getProductsCtrl,
  getProductCtrl,
  createProductCtrl,
  updateProductCtrl,
  deleteProductCtrl
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProductsCtrl); // GET all products
router.get('/:id', getProductCtrl); // GET product by ID
router.post('/', createProductCtrl); // POST new product
router.put('/:id', updateProductCtrl); // PUT update product
router.delete('/:id', deleteProductCtrl); // DELETE product

export default router;
