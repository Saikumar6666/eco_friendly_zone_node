import { db } from "../dbConfig.js";
import { execQuery } from "../utils/dbUtil.js";

export const createOrder = async (orderData) => {
  const {
    user_id,
    full_name,
    email,
    phone,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
    total_amount
  } = orderData;

  const query = `
    INSERT INTO orders (
      user_id, full_name, email, phone, address_line1, address_line2,
      city, state, postal_code, country, total_amount
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id, full_name, email, phone, address_line1, address_line2,
    city, state, postal_code, country, total_amount
  ];

  return execQuery(db, query, values);
};

export const insertOrderItems = async (order_id, items) => {
  const values = items.map(item => [order_id, item.product_id, item.quantity, item.price]);
  const query = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`;
  return execQuery(db, query, [values]);
};

export const clearCart = async (user_id) => {
  return execQuery(db, `DELETE FROM cart WHERE user_id = ?`, [user_id]);
};
