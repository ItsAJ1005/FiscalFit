class abacPolicyDecisionPoint {
  constructor() {

    this.rolesSet = {
      naive: "naive",
      expert: "expert",
      supreme: "supreme",
    };

    this.actionsSet = {
      deleteUser: "delete_user",
      banUser: "ban_user",
      readUser: "read_user",
      updateUser: "update_user",
      deletePost: "delete_post",
      createPost: "create_post",
      banPost: "ban_post",
      readPost: "read_post",
      updatePost: "update_post",
      createComment: "create_comment",
      deleteComment: "delete_comment",
      banComment: "ban_commment",
      readComment: "read_comment",
      updateComment: "update_comment",
      createCommunity: "create_community",
      deleteCommunity: "delete_community",
      banCommunity: "ban_community",
      readCommunity: "read_community",
      updateCommunity: "update_community",
      createCall: "create_call",
      closeCall: "close_call",
      startCall: "start_call",
      createAsset: "create_asset",
      readAsset: "read_asset",
      updateAsset: "update_asset",
      deleteAsset: "delete_asset",
    };

    this.resourcesSet = {
      unBanned : false,
      banned: true,
      removed: true,
      post: "post",
      community: "community",
      comment: "comment",
      asset: "asset"
    };
    
    this.allowed = [
      {
        user:{
          attributes: {
            role: this.rolesSet.supreme,
          }
        },
        action: this.actionsSet.createComment,
        resourse : {
          type:this.resourcesSet.post,
          attributes : {
            isBanned: this.resourcesSet.banned
          }
        }
      },
      {
        user:{
          attributes: {
            role: this.rolesSet.naive,
          }
        },
        action: this.actionsSet.createComment,
        resourse : {
          type:this.resourcesSet.post,
          attributes : {
            // isBanned: this.resourcesSet.unBanned
          }
        }
      },
      {
        user:{
          attributes: {
            role: this.rolesSet.supreme,
          }
        },
        action: this.actionsSet.createComment,
        resourse : {
          type:this.resourcesSet.post,
          attributes : {
            // isBanned: this.resourcesSet.unBanned
          }
        }
      },
      {
        user:{
          attributes: {
            role: this.rolesSet.naive,
          }
        },
        action: this.actionsSet.createPost,
        resourse : {
          type:this.resourcesSet.community,
          attributes : {
            // isBanned: this.resourcesSet.unBanned
          }
        }
      },{
        user:{
          attributes: {
            role: this.rolesSet.supreme,
          }
        },
        action: this.actionsSet.createPost,
        resourse : {
          type:this.resourcesSet.community,
          attributes : {
            isBanned: this.resourcesSet.banned
          }
        }
      },{
        user:{
          attributes: {
            role: this.rolesSet.supreme,
          }
        },
        action: this.actionsSet.createPost,
        resourse : {
          type:this.resourcesSet.community,
          attributes : {
            // isBanned: this.resourcesSet.unBanned
          }
        }
      }
    ];
  }

  isAllowed(conditionalSet) {
    return this.allowed.some((data) => {
      console.log(data);
      return JSON.stringify(data) === JSON.stringify(conditionalSet);
    });
  }
}

module.exports = abacPolicyDecisionPoint;
