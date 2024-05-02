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
          req.resourse = resourse;
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
    execute(permission) {
      return async (req,res,next) =>{
          const data = permission.split('_');
          req.permission = data[0];
          req.resourse = data[1];
          const User = await Validation.getUser(req.cookies.jwt);
          req.user = User;
          if (!req.cookies || !req.cookies.jwt) {
              return res.status(403).json({ error: 'JWT token not found' });
          }
          const userRole = req.user ? req.user.role : 'anonymous';
          if (userRole !== 'anonymous') {
            req.middleware = "chineseWall";
            return next();
          }else {
            return res.status(403).json({ error: 'Access denied' });
          }
    }
  }
}


  class PDP {
    static async execute(req, res, next) {
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
          user:{
            // ...(req.user.id && {id: req.user.id}),
            attributes: {
              ...(req.user.role && {role : req.user.role})
            }
          },
          ...(req.permission && {action : req.permission}),
          resourse : {
            ...(req.resourse && {type : req.resourse}),
            attributes : {
              ...(req.asset?.isBanned===true && {isBanned : req.asset?.isBanned})
            }
          }
        }
        if(abacPDP.isAllowed(conditionalSet)){
          return next();
        }else{
          return res.status(403).json({ error: 'Access denied' });
        }
      }else if(req.middleware === 'chineseWall'){
        // req.body.resourse
        if(req.user.role === 'supreme'){
          return next();
        }else if(req.user.role === 'naive'){
          if(req.permission == 'delete' && req.resourse == 'community'){
            return res.status(403).json({ message: 'Access denied' });
          }else if(req.permission == 'delete' && req.resourse == 'post'){
            const post = await Post.findById(req.body.resourse);
            if(String(post.user) == String(req.user._id)){
              return next();
            }
          }else if(req.permission == 'delete' && req.resourse == 'comment'){
            const comment = await Comment.findById(req.body.resourse);
            if(String(comment.user) == String(req.user._id)){
              return next();
            }
          }
        }else if(req.user.role === 'expert'){
          if(req.permission == 'delete' && req.resourse == 'community'){
            const community = await Community.findById(req.body.resourse);
            if(String(community.owner) == String(req.user._id)){
              return next();
            }
          }else if(req.permission == 'delete' && req.resourse == 'post'){
            const post = await Post.findById(req.body.resourse);
            if(String(post.user) == String(req.user._id)){
              return next();
            }
          }else if(req.permission == 'delete' && req.resourse == 'comment'){
            const comment = await Comment.findById(req.body.resourse);
            if(String(comment.user) == String(req.user._id)){
              return next();
            }
          }
        }
        return res.status(403).json({ message: 'Access denied' });
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
