module.exports = {


  friendlyName: 'View Product index',


  description: 'Display "Index" page.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'admin/product/index'
    },
    redirect: {
      responseType: 'redirect',
    }
  },


  fn: async function (inputs, exits) {
    return exits.success();
  }


};
