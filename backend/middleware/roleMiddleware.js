/**
 * Middleware to check user roles
 * @param {Array<string>} roles - list of roles allowed to access the route
 */
exports.roleMiddleware = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied.' });
  }
  next();
};
