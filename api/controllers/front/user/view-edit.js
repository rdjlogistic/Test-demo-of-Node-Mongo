module.exports = {


  friendlyName: 'Edit',


  description: 'Edit user.',


  inputs: {

  },


  exits: {
    success: {
      viewTemplatePath: 'admin/user/edit'
    },
    redirect: {
      responseType: 'redirect'
    },

  },


  fn: async function (inputs, exits) {

    var user_id = this.req.params['userId'];
    // var user_id = inputs.adminId;
    console.log("request get id :- ", user_id);

    var userRecord = await User.findOne({
      id: user_id
    });
    return exits.success({
        userRecord: userRecord
    });
  }




};
