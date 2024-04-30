const validation = require('./Validation');
const rbacPolicyDecisionPoint = require('./rbacPolicyDecisionPoint');
const abacPolicyDecisionPoint = require('./abacPolicyDecisionPoint');
const Validation = new validation();
const rbacPDP = new rbacPolicyDecisionPoint();
const abacPDP = new abacPolicyDecisionPoint();
const User = require('../models/User');
const Comment = require('../models/Comment');
const Community = require('../models/Community');
const Post = require('../models/Post');
const Asset = require('../models/Asset');
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
    execute(permission,resourse) {
      return async (req,res,next) =>{
        if(resourse == 'user'){
          req.asset = await User.findById(req.body.resourse);
        }else if(resourse == 'post'){
          req.asset = await Post.findById(req.body.resourse);
        }else if(resourse == 'comment'){
          req.asset = await Comment.findById(req.body.resourse);
        }else if(resourse == 'community'){
          req.asset = await Community.findById(req.body.resourse);
        }else if(response == 'asset'){
          req.asset = await Asset.findById(req.body.resourse);
        }else{
          console.error("Bad request {check permission}");
        }
        const User = await Validation.getUser(req.cookies.jwt);
        req.user = User;
        if (!req.cookies || !req.cookies.jwt) {
            return res.status(403).json({ error: 'JWT token not found' });
        }
        const userRole = req.user ? req.user.role : 'anonymous';
        if (userRole !== 'anonymous') {
          req.permission = permission;
          req.middleware = "abac";
          return next();
      } else {
          return res.status(403).json({ error: 'Access denied' });
      }
      }
    }
  }

  class ChineseWallPolicy extends Middleware {
    execute(req, res, next) {
      next();
    }
  }


  class PDP {
    static execute(req, res, next) {
      if(req.middleware === 'rbac'){
        const userPermissions = rbacPDP.getPermissionsByRoleName(req.user.role);
        if (userPermissions.includes(req.permission)) {
            return next();
        } else {
            return res.status(403).json({ error: 'Access denied' });
        }
      }else if(req.middleware === 'abac'){
        // create conditional set
        const conditionalSet = {
          ...(req.user.role && {role : req.user.role}),
          ...(req.permission && {action : req.permission}),
          ...(req.asset?.isBanned===true && {isBanned : isBanned})
        }
        if(abacPDP.isAllowed(conditionalSet)){
          return next();
        }else{
          return res.status(403).json({ error: 'Access denied' });
        }
      }else if(req.middleware === 'chineseWall'){

      }else{
        res.status(400).json({message: "Using anonyomous policy"});
      }
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
