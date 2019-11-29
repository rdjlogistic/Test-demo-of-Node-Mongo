module.exports = {
  friendlyName: "View user product",

  description: 'Display "Product Create" page.',

  exits: {
    success: {
      viewTemplatePath: "admin/product/create",
    },
  },

  fn: async function(inputs, exits) {
    // let roleList = await Role.find({ name: { "!=": "super_admin" } });
    return exits.success({ productRecord: "",  roleResult: [] });
  },
};
