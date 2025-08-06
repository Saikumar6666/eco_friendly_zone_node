import { db } from '../dbConfig.js';
import { execQuery } from '../utils/dbUtil.js';

export const getDashboardStats = async () => {
  const [products] = await execQuery(db, `SELECT COUNT(*) AS total FROM products`);
  const [orders] = await execQuery(db, `SELECT COUNT(*) AS total FROM orders`);
  const [revenue] = await execQuery(db, `SELECT SUM(total_amount) AS total FROM orders`);
  return {
    products: products.total,
    orders: orders.total,
    revenue: revenue.total || 0
  };
};

export const getProductsPaginated = async (limit, offset) => {
  const data = await execQuery(db, `SELECT * FROM products LIMIT ? OFFSET ?`, [limit, offset]);
  const count = await execQuery(db, `SELECT COUNT(*) as total FROM products`);
  return { products: data, total: count[0].total };
};

export const insertProduct = (product) => {
  const { name, description, price, image } = product;
  const q = `INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)`;
  return execQuery(db, q, [name, description, price, image]);
};

export const modifyProduct = (id, product) => {
  const { name, description, price, image } = product;
  const q = `UPDATE products SET name=?, description=?, price=?, image=? WHERE id=?`;
  return execQuery(db, q, [name, description, price, image, id]);
};

export const removeProduct = (id) => {
  const q = `DELETE FROM products WHERE id = ?`;
  return execQuery(db, q, [id]);
};

export const getAllOrders = () => {
  const q = `
    SELECT o.*,u.full_name, u.email 
    FROM orders o 
    JOIN user u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `;
  return execQuery(db, q);
};
