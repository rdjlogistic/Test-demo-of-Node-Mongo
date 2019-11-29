/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // // '*': [''],
  // "*": false,

  // Bypass the `is-super-admin` policy for:
  // "admin/*": ["is-super-admin"],
  // "admin/admin/auth/*": true,

  // // "api/*": ["isAuthorized"],
  // "api/v1/user/auth/*": true,
  // // "api/v1/user/create": true,

  // "common/*": true,
  // "front/*": true,

  // "swagger": true,
  // "swaggerjson": true,

  // "graphql/*": true,

};
