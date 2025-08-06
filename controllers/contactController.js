import { saveContactMessage, getAllContactMessages } from '../models/contactModel.js';

export const submitContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All required fields must be filled.' });
  }

  try {
    await saveContactMessage(name, email, subject, message);
    res.status(200).json({ message: 'Thank you! Your message has been received.' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ message: 'Server error while saving contact message.' });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const result = await getAllContactMessages();
    res.status(200).json({ status: 200, messages: result });
  } catch (err) {
    console.error('Error fetching contact messages:', err);
    res.status(500).json({ message: 'Error retrieving messages' });
  }
};
