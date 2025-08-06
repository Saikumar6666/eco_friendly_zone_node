import express from 'express';
import { submitContactMessage, getContactMessages } from '../controllers/contactController.js';

const router = express.Router();

router.post('/contact', submitContactMessage);      // for user submission
router.get('/admin/messages', getContactMessages);  // for admin viewing

export default router;
