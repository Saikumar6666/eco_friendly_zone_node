// TEMPORARY admin check without token

export const adminAuthMiddleware = (req, res, next) => {
  // Example: use a query param or hardcoded check for now
  const isAdmin = req.query.admin === 'true'; // or replace with your own logic

  if (!isAdmin) {
    return res.status(403).json({ status: 403, message: 'Access denied: Admin only' });
  }

  // Proceed if "admin" is allowed
  next();
};
