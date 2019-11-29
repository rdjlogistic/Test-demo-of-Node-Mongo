module.exports = {
  friendlyName: "Update",

  description: "Update user.",

  inputs: {
    userId: {
      type: "string",
    },
    id: {
      type: "number",
    },
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    email: {
      unique: true,
      required: true,
      type: "string",
      isEmail: true,
      description: "The email address for the new account, e.g. m@example.com.",
      extendedDescription: "Must be a valid email address.",
    },
    roles: {
      required: true,
      type: "ref",
    },
  },

  exits: {
    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function(inputs, exits) {
    let objUser = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
    };

    await User.replaceCollection(inputs.userId, "roles").members(inputs.roles);

    await User.update({
      id: inputs.userId,
    }).set(objUser);

    this.req.session.flash = {
      type: "success",
      message: "User update successfully",
    };

    throw {
      redirect: "/admin/users",
    };
  },
};
