import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../models/productModel.js';

export const getProductsCtrl = (req, res) => {
  getAllProducts((err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch products', error: err });
    res.status(200).json(results);
  });
};

export const getProductCtrl = (req, res) => {
  const id = req.params.id;
  getProductById(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching product', error: err });
    if (!result.length) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(result[0]);
  });
};

export const createProductCtrl = (req, res) => {
  createProduct(req.body, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to create product', error: err });
    res.status(201).json({ message: 'Product created successfully', product: result });
  });
};

export const updateProductCtrl = (req, res) => {
  const id = req.params.id;
  updateProduct(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to update product', error: err });
    res.status(200).json({ message: 'Product updated successfully', result });
  });
};

export const deleteProductCtrl = (req, res) => {
  const id = req.params.id;
  deleteProduct(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to delete product', error: err });
    res.status(200).json({ message: 'Product deleted successfully' });
  });
};
