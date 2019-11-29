module.exports = {


  friendlyName: 'Update',


  description: 'Update admin.',


  inputs: {
    _id: {
      type: 'string',
    },
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    email: {
      unique: true,
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },
    password: {
      //   required: true,
      type: 'string',
      maxLength: 15,
      minLength: 6,
      description: 'The unencrypted password to use for the new account.'
    },
  },


  exits: {
    redirect: {
      responseType: 'redirect'
    }
  },


  fn: async function (inputs, exits) {
    // return "get in update";

    let objAdmin = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email
    }

    if (inputs.password) {
      objAdmin.password = await sails.helpers.passwords.hashPassword(inputs.password)
    }

    var admin = await Admin.update({
      _id: this.req.params['adminId']
    }).set(objAdmin);

    console.log("update id :- ", this.req.params['adminId'], objAdmin);
    throw {
      redirect: '/admin/admins'
    };
  }


};
