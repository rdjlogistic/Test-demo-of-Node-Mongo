module.exports = {
  friendlyName: "Login",

  inputs: {
    email: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: "string",
      required: true,
    },

    password: {
      description: 'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "The requesting user agent has been successfully logged in.",
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
      responseType: "badRequest",
    },

    redirect: {
      description: "The requesting user is already logged in.",
      responseType: "redirect",
    },
  },

  fn: async function(inputs, exits) {
    var userRecord = await User.findOne({
      email: inputs.email.toLowerCase(),
    }).populateAll();

    // If there was no matching user, respond thru the "badCombo" exit.
    if (!userRecord) {
      throw "badCombo";
    }

    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords
      .checkPassword(inputs.password, userRecord.password)
      .intercept("incorrect", "badCombo");

    let menus = await sails.helpers.menuHelper.with({
      roles: userRecord.roles,
    });

    userRecord.menus = menus;

    exits.success({
      data: userRecord,
      token: jwToken.issue({
        id: userRecord.id,
      }),
      message: "login successfully",
    });
  },
};
