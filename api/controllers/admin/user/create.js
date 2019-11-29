module.exports = {
  friendlyName: "Create",

  description: "Create admin.",

  inputs: {
    firstName: {
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

  },

  exits: {
    invalid: {
      statusCode: 409,
      description: "Name and City is required.",
    },

    redirect: {
      responseType: "redirect",
    },
  },

  fn: async function(inputs, exits) {

    for (let index = 0; index < 50; index++) {

      var result           = '';
      var characters       = 'abcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for ( var i = 0; i < 5; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      inputs.firstName = result;
      inputs.email = result + "@yahoo.com";
      console.log('inputs', inputs);
      await User.create(inputs);

    }


    this.req.session.flash = {
      type: "success",
      message: "User create successfully",
    };
    throw {
      redirect: "/admin/users",
    };
  },
};
