/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  fetchRecordsOnUpdate: true,
  tableName: "User",

  attributes: {
    firstName: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },

    // emailStatus: {
    //   type: 'string',
    //   isIn: ['unconfirmed', 'change-requested', 'confirmed'],
    //   defaultsTo: 'confirmed',
    //   description: 'The confirmation status of the user\'s email address.',
    // },
    // emailProofToken: {
    //   type: 'string',
    //   description: 'A pseudorandom, probabilistically-unique token for use in our account verification emails.'
    // },

    // emailProofTokenExpiresAt: {
    //   type: 'number',
    //   description: 'A JS timestamp (epoch ms) representing the moment when this user\'s `emailProofToken` will expire (or 0 if the user currently has no such token).',
    //   example: 1502844074211
    // },
  },
  // customToJSON: function() {
  //   // Return a shallow copy of this record with the password and ssn removed.
  //   return _.omit(this, ["password", "verificationToken"]);
  // },

  // beforeCreate: async function(valuesToSet, proceed) {
  //   // Hash password
  //   // console.log('beforeCreate', valuesToSet);
  //   await sails.helpers.passwords.hashPassword(valuesToSet.password).exec((err, hashedPassword) => {
  //     if (err) {
  //       return proceed(err);
  //     }
  //     valuesToSet.password = hashedPassword;
  //     valuesToSet.verificationToken = sails.helpers.strings.random("url-friendly");
  //     return proceed();
  //   });
  // },

  // fn: async function(inputs, exits) {
  //   var userRecord = await Admin.create({
  //     firstName: inputs.firstName,
  //     lastName: inputs.lastName,
  //     email: inputs.email,
  //     password: await sails.helpers.passwords.hashPassword(inputs.password),
  //   })
  //     .intercept("E_UNIQUE", err => {
  //       this.req.session.flash = {
  //         type: "error",
  //         message: "Admin already exsist",
  //       };
  //       return this.res.redirect("/admin/create");
  //     })
  //     .fetch();

  //   if (!userRecord) {
  //     return exits.invalid({
  //       message: "invalid",
  //     });
  //   }

  //   throw {
  //     redirect: "/admin/admins",
  //   };

  // },

  // afterCreate: async function(valuesToSet, proceed) {
  //   console.log("afterCreate", valuesToSet, sails.helpers.strings.random("url-friendly"));
  //   if (sails.config.custom.verifyEmailAddresses) {
  //     await sails.helpers.sendEmail.with({
  //       to: valuesToSet.email,
  //       subject: "Please confirm your account",
  //       template: "email-verify-account",
  //       layout: "layout-email",
  //       typeOfSend: "queue", // 'now', 'queue', 'preview'
  //       templateData: {
  //         id: valuesToSet.id,
  //         fullName: valuesToSet.firstName + " " + valuesToSet.lastName,
  //         token: valuesToSet.verificationToken,
  //       },
  //     });
  //   } else {
  //     sails.log.info("Skipping new account email verification... (since `verifyEmailAddresses` is disabled)");
  //   }
  //   return proceed();
  // },

  // beforeUpdate: async function(valuesToSet, proceed) {
  //   console.log("beforeUpdate", valuesToSet);
  //   if (valuesToSet.password) {
  //     await sails.helpers.passwords.hashPassword(valuesToSet.password).exec((err, hashedPassword) => {
  //       if (err) {
  //         return proceed(err);
  //       }
  //       valuesToSet.password = hashedPassword;
  //     });
  //   }
  //   return proceed();
  // },

  //   afterUpdate: function (valuesToSet, proceed) {
  //     console.log('afterUpdate', valuesToSet);
  //     return proceed();
  //   },

  //   beforeDestroy: function (valuesToSet, proceed) {
  //     console.log('beforeDestroy', valuesToSet);
  //     return proceed();
  //   },

  //   afterDestroy: function (valuesToSet, proceed) {
  //     console.log('beforeDestroy', valuesToSet);
  //     return proceed();
  //   },
};
