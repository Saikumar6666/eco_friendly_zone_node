import { getDashboardStats, getProductsPaginated, insertProduct, modifyProduct, removeProduct, getAllOrders } from '../models/adminModel.js';

export const getStats = async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json({ status: 200, stats });
  } catch {
    res.status(500).json({ status: 500, message: 'Error fetching stats' });
  }
};

export const getPaginatedProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 100;
  const offset = (page - 1) * limit;
  try {
    const data = await getProductsPaginated(limit, offset);
    res.json({ status: 200, ...data });
  } catch {
    res.status(500).json({ status: 500, message: 'Error fetching products' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const image = req.file?.filename || '';
    const { name, description, price } = req.body;
    const result = await insertProduct({ name, description, price, image });
    res.json({ status: 200, message: 'Product added', result });
  } catch {
    res.status(500).json({ status: 500, message: 'Failed to add product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const image = req.file?.filename || '';
    const { name, description, price } = req.body;
    const result = await modifyProduct(req.params.id, { name, description, price, image });
    res.json({ status: 200, message: 'Product updated', result });
  } catch {
    res.status(500).json({ status: 500, message: 'Update failed' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await removeProduct(req.params.id);
    res.json({ status: 200, message: 'Product deleted' });
  } catch {
    res.status(500).json({ status: 500, message: 'Deletion failed' });
  }
};

export const getOrders = async (_, res) => {
  try {
    const orders = await getAllOrders();
    res.json({ status: 200, orders });
  } catch {
    res.status(500).json({ status: 500, message: 'Order fetch failed' });
  }
};
