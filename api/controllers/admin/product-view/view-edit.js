module.exports = {
  friendlyName: "Edit",

  description: "Edit user.",

  inputs: {},

  exits: {
    success: {
      viewTemplatePath: "admin/user/edit",
    },
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function(inputs, exits) {
    var user_id = this.req.params["userId"];

    var userRecord = await User.findOne({
      id: user_id,
    }).populate("roles");

    let roleList = await Role.find({ name: { "!=": "super_admin" } });
    let roleResult = _.map(userRecord.roles, "id");

    return exits.success({
      userRecord: userRecord,
      roleList: roleList,
      roleResult: roleResult,
    });
  },
};
