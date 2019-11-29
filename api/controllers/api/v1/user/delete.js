module.exports = {
  friendlyName: "Delete",

  description: "Delete User.",

  inputs: {
    userId: {
      type: "string",
    },
  },

  exits: {
    success: {
      description: "User Deleted.",
    },
    redirect: {
      responseType: "redirect",
    },
    invalid: {
      statusCode: 409,
      description: "Invalid request",
    },
  },

  fn: async function(inputs, exits) {
    let policyResponse = await sails.helpers.policyHelper
      .with({
        policyType: "user.delete",
        userId: this.req.userId,
      })
      .tolerate("permissionError", err => {
        return this.res.forbidden(err.raw);
      });

    if (policyResponse) return;

    // ===========================================================================================

    var userId = inputs.userId;
    console.log("delete request get id :- ", userId);

    var userRecord = await User.destroy({
      id: userId,
    }).fetch();

    if (!userRecord) {
      return exits.invalid({
        message: "invalid",
      });
    }

    exits.success({
      message: "User has been deleted successfully.",
      data: userRecord,
    });
  },
};
