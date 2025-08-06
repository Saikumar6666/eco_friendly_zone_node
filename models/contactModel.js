import { db } from "../dbConfig.js";
import { execQuery } from "../utils/dbUtil.js";

export const saveContactMessage = (name, email, subject, message) => {
  const q = `
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;
  return execQuery(db, q, [name, email, subject, message]);
};

export const getAllContactMessages = () => {
  const q = `SELECT * FROM contact_messages ORDER BY created_at DESC`;
  return execQuery(db, q);
};
