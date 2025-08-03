import express from 'express';
import {
  getStats,
  getPaginatedProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getOrders
} from '../controllers/adminController.js';
import { adminAuthMiddleware } from '../middlewares/auth.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.use(adminAuthMiddleware);

router.get('/stats', getStats);
router.get('/products', getPaginatedProducts);
router.post('/products', upload.single('image'), addProduct);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/orders', getOrders);

export default router;
