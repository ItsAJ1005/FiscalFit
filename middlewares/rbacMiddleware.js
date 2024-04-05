const Permissions = require('../models/permissions');
const Validation = require('../utils/Validation');
const Validation = new Validation();
exports.checkPermission = (permission) => {
  return (req, res, next) => {
    const User = Validation.getUser(req.jwt);
    const userRole = req.user ? req.user.role : 'anonymous';
    const userPermissions = new Permissions().getPermissionsByRoleName(userRole);
    if (userPermissions.includes(permission)){
      req.middleware = "rbac";
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  };
};