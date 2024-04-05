const validation = require('./Validation');
const permissions = require('./Permission');
const Validation = new validation();
const Permissions = new permissions();

 class Middleware {
    execute(req, res, next) {
      throw new Error('Method not implemented');
    }
 }


 class RBACMiddleware extends Middleware {
    
    execute(permission) {
        return async (req, res, next) => {
            const User = await Validation.getUser(req.cookies.jwt);
            req.user = User;
            if (!req.cookies || !req.cookies.jwt) {
                return res.status(403).json({ error: 'JWT token not found' });
            }
            const userRole = req.user ? req.user.role : 'anonymous';
            if (userRole !== 'anonymous') {
                req.permission = permission;
                req.middleware = "rbac";
                return next();
            } else {
                return res.status(403).json({ error: 'Access denied' });
            }
        };
    }
    
 }
  

  class ABACMiddleware extends Middleware {
    execute(req, res, next) {
      console.log('ABAC middleware logic');
      next();
    }
  }

  class ChineseWallPolicy extends Middleware {
    execute(req, res, next) {
      console.log('Chinese Wall Policy middleware logic');
      next();
    }
  }


  class PDP {
    static execute(req, res, next) {
      if(req.middleware === 'rbac'){
        const userPermissions = Permissions.getPermissionsByRoleName(req.user.role);
        if (userPermissions.includes(req.permission)) {
            return next();
        } else {
            return res.status(403).json({ error: 'Access denied' });
        }
      }else if(req.middleware === 'abac'){

      }else if(req.middleware === 'chineseWall'){

      }
      next();
    }
  }
  

  class PEP {
    constructor(middleware) {
      this.middleware = middleware;
    }
  
    execute(req, res, next) {
      this.middleware.execute(req, res, next);
    }
  }


  module.exports = {
    PEP,
    RBACMiddleware,
    ABACMiddleware,
    ChineseWallPolicy,
    PDP
  };