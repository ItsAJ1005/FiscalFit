class Assets {
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
      createPost: "create-post",
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
    };
    
    this.allowed = [
      {
        role: this.rolesSet.supreme,
        action: this.actionsSet.createComment,
        isBanned: this.resourcesSet.banned
      },
      {
        role : this.rolesSet.naive,
        action: this.actionsSet.createComment,
      },
      {
        role : this.rolesSet.supreme,
        action: this.actionsSet.createComment,
      },{
        role : this.rolesSet.naive,
        action : this.actionsSet.createPost
      },{
        role : this.rolesSet.expert,
        action : this.actionsSet.createPost
      },{
        role : this.rolesSet.supreme,
        action : this.actionsSet.createPost,
        isBanned: this.resourcesSet.banned
      },{
        role : this.rolesSet.naive,
        action : this.actionsSet.createPost
      }
    ];
  }

  isAllowed(conditionalSet) {
    return this.allowed.some((data) => {
      return JSON.stringify(data) === JSON.stringify(conditionalSet);
    });
  }
}

module.exports = Assets;
