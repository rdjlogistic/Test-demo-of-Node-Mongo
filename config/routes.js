/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

var adminRoutes = {
  // 'GET /': { action: 'common/view-homepage-or-redirect'},
  "GET ": { action: "common/view-homepage-or-redirect" },
  "GET /login": { view: "admin/login", locals: { layout: "admin/layouts/layout" } },

  // Not Secured API
  "POST /login": { action: "admin/admin/auth/login", locals: { layout: "admin/layouts/master" } },
  "GET /logout": { action: "admin/admin/auth/logout", locals: { layout: "admin/layouts/layout" } },

  // Secured Views and APIs
  "GET /dashboard": { action: "admin/dashboard/view-index", locals: { layout: "admin/layouts/master" } },

  // admin
  "GET /admins": { action: "admin/admin/view-index", locals: { layout: "admin/layouts/master" } },
  "GET /create": { action: "admin/admin/view-create", locals: { layout: "admin/layouts/master" } },
  "GET /edit/:adminId": { action: "admin/admin/view-edit", locals: { layout: "admin/layouts/master" } },

  "GET /index": { action: "admin/admin/index" }, //getting list of admin with datatable
  "POST /create": { action: "admin/admin/create" },
  "POST /update/:adminId": { action: "admin/admin/update", locals: { layout: "admin/layouts/master" } },
  "DELETE /:_id": { action: "admin/admin/delete" },

  // user
  "GET /users": { action: "admin/user/view-index", locals: { layout: "admin/layouts/master" } },
  "GET /user/create": { action: "admin/user/view-create", locals: { layout: "admin/layouts/master" } },
  "GET /user/edit/:userId": { action: "admin/user/view-edit", locals: { layout: "admin/layouts/master" } },

  "GET /user/index": { action: "admin/user/index" }, //getting list of admin with datatable
  "POST /user/create": { action: "admin/user/create" },
  "POST /user/update/:userId": { action: "admin/user/update" },
  "DELETE /user/:_id": { action: "admin/user/delete" },

    // product
    "GET /product": { action: "admin/product/view-index", locals: { layout: "admin/layouts/master" } },
    "GET /product/create": { action: "admin/product/view-create", locals: { layout: "admin/layouts/master" } },
    "GET /product/index": { action: "admin/product/index" }, //getting list of admin with datatable
    "POST /product/create": { action: "admin/product/create" },

  // product-view
  "GET /product-view": { action: "admin/product-view/view-index", locals: { layout: "admin/layouts/master" } },
  "GET /product-view/create": { action: "admin/product-view/view-create", locals: { layout: "admin/layouts/master" } },
  "GET /product-view/index/:filter": { action: "admin/product-view/index" }, //getting list of admin with datatable
  "POST /product-view/create": { action: "admin/product-view/create" },

};

var apiV1 = {
  //  API V1
  "POST /user/login": { action: "api/v1/user/auth/login" },
  "POST /user/create": { action: "api/v1/user/create" },
  "POST /user/update/:userId": { action: "api/v1/user/update" },
  "DELETE /user/delete/:userId": { action: "api/v1/user/delete" },
  "POST /user/refresh-token": { action: "api/v1/user/refresh-token" },
};

var otherRoutes = {
  // Not Secure Views
  "/": { view: "pages/homepage" },
  // test route
  "GET /email/confirm": { action: "common/confirm-email", locals: { layout: "admin/layouts/layout" } },
  "GET /test-job": { action: "common/test-job" },
  "GET /test-mail": { action: "common/test-mail" },
  "GET /data-seed": { action: "common/data-seed" },

  "POST /graphql": { action: "graphql/graphql" },
};

function genRoutes(objRoutes) {
  // console.log(objRoutes);
  var prefix = Object.keys(objRoutes);
  let newRoutes = {};
  let routes = {};
  // console.log(prefix);

  for (let i = 0; i < prefix.length; i++) {
    var paths = Object.keys(objRoutes[prefix[i]]);
    // console.log('paths =>', paths);
    paths.forEach(function(path) {
      var pathParts = path.split(" "),
        uri = pathParts.pop(),
        prefixedURI = "",
        newPath = "";

      prefixedURI = (prefix[i] ? "/" : "") + prefix[i] + uri;
      pathParts.push(prefixedURI);
      newPath = pathParts.join(" ");
      // construct the new routes
      newRoutes[newPath] = objRoutes[prefix[i]][path];
    });
  }
  routes = newRoutes;
  // console.log('routes => ', routes);
  return routes;
}

// generate route with prefix keys
var routes = genRoutes({
  "": otherRoutes,
  admin: adminRoutes,
  "api/v1": apiV1,
});

// assigning generated route
module.exports.routes = routes;
