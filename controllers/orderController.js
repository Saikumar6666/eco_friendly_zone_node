import { createOrder, insertOrderItems, clearCart } from '../models/orderModel.js';
import { getCartItemsWithProductDetails } from '../models/cartModel.js';

export const placeOrder = async (req, res) => {
  const { user_id, full_name, email, phone, address_line1, address_line2, city, state, postal_code, country } = req.body;

  try {
    const cartItems = await getCartItemsWithProductDetails(user_id);

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ status: 400, message: "Cart is empty" });
    }

    const total_amount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    const result = await createOrder({
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
    });

    const order_id = result.insertId;

    const items = cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    await insertOrderItems(order_id, items);
    await clearCart(user_id);

    res.status(200).json({ status: 200, message: "Order placed successfully", order_id });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ status: 500, message: "Error processing order" });
  }
};
