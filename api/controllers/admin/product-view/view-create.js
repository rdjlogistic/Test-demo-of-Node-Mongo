module.exports = {
  friendlyName: "View user create",

  description: 'Display "User Create" page.',

  exits: {
    success: {
      viewTemplatePath: "admin/product-view/create",
    },
  },

  fn: async function(inputs, exits) {
    // let roleList = await Role.find({ name: { "!=": "super_admin" } });
    return exits.success({ productRecord: "",  roleResult: [] });
  },
};
