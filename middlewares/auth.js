// File: middlewares/adminAuthMiddleware.js

export const adminAuthMiddleware = (req, res, next) => {
  const role = req.body?.role || req.query?.role;

  if (role !== 'admin') {
    return res.status(403).json({ status: 403, message: 'Access denied: Admins only' });
  }

  next();
};
