import { db } from '../dbConfig.js';
import { execQuery } from '../utils/dbUtil.js';

// Get all products
export const getAllProducts = (callback) => {
  const query = 'SELECT * FROM products';
  execQuery(db, query, callback);
};

// Get single product by ID
export const getProductById = (id, callback) => {
  const query = `SELECT * FROM products WHERE id = ?`;
  execQuery(db, query, [id], callback);
};

// Create new product
export const createProduct = (product, callback) => {
  const { name, description, price, image, category, stock } = product;
  const query = `INSERT INTO products (name, description, price, image, category, stock) VALUES (?, ?, ?, ?, ?, ?)`;
  execQuery(db, query, [name, description, price, image, category, stock], callback);
};

// Update product by ID
export const updateProduct = (id, product, callback) => {
  const { name, description, price, image, category, stock } = product;
  const query = `UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, stock = ? WHERE id = ?`;
  execQuery(db, query, [name, description, price, image, category, stock, id], callback);
};

// Delete product by ID
export const deleteProduct = (id, callback) => {
  const query = `DELETE FROM products WHERE id = ?`;
  execQuery(db, query, [id], callback);
};
