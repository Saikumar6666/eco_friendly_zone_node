import {
  addToCart,
  getCartItems,
  removeCartItem,
  updateQuantityMdl,
  getCartItemsWithProductDetails
} from "../models/cartModel.js";

export const addItem = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ status: 400, message: 'All fields are required' });
  }

  try {
    const result = await addToCart(user_id, product_id, quantity);
    res.status(200).json({ status: 200, message: 'Item added to cart', result });
  } catch (error) {
    console.error('Error in addToCart controller:', error);
    res.status(500).json({ status: 500, message: 'Failed to add to cart', error });
  }
};

export const getCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await getCartItems(userId);
    res.status(200).json({ status: 200, result });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

export const removeItem = async (req, res) => {
  const { cartId } = req.params;
  try {
    const result = await removeCartItem(cartId);
    res.status(200).json({ status: 200, message: 'Item removed from cart', result });
  } catch (err) {
    console.error('Error removing item:', err);
    res.status(500).json({ status: 500, message: 'Error removing item from cart' });
  }
};

export const getCartItemsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await getCartItemsWithProductDetails(userId);
    res.status(200).json({ status: 200, result });
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ status: 500, message: 'Error fetching cart items' });
  }
};

export const updateQuantity = async (req, res) => {
  const cartId = req.params.id;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ status: 400, message: 'Invalid quantity' });
  }

  try {
    const result = await updateQuantityMdl(cartId, quantity);
    res.status(200).json({ status: 200, message: 'Quantity updated', result });
  } catch (err) {
    console.error('Error updating quantity:', err);
    res.status(500).json({ status: 500, message: 'Error updating quantity' });
  }
};
