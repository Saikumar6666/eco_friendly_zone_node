import { db } from "../dbConfig.js";
import { execQuery } from "../utils/dbUtil.js";

// Add a product to cart
export const addToCart = (userId, productId, quantity) => {
  const q = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`;
  return execQuery(db, q, [userId, productId, quantity]);
};

// Fetch basic cart items (not used currently, but included for completeness)
export const getCartItems = (userId) => {
  const q = `
    SELECT c.id AS cart_id, p.name, p.description, p.price, c.quantity
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  return execQuery(db, q, [userId]);
};

// Remove item from cart
export const removeCartItem = (cartId) => {
  const q = `DELETE FROM cart WHERE id = ?`;
  return execQuery(db, q, [cartId]);
};

// Update quantity of an item in the cart
export const updateQuantityMdl = (cartId, quantity) => {
  const q = `UPDATE cart SET quantity = ? WHERE id = ?`;
  return execQuery(db, q, [quantity, cartId]);
};

// Get cart items with full product details (used by frontend)
export const getCartItemsWithProductDetails = (userId) => {
  const q = `
    SELECT 
      cart.id AS cart_id,
      cart.user_id,
      cart.product_id,
      cart.quantity,
      products.name,
      products.description,
      products.price,
      products.image
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;
  return execQuery(db, q, [userId]);
};
