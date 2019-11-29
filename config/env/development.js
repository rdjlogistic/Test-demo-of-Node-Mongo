// var AWS = require("aws-sdk");

module.exports = {
  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  mode: 'development',
  siteName: 'Sails1Template',
  shortName: 'ST',
  redis_url: 'redis://127.0.0.1:6379',



  mail: {
    email: 'task.logistic.test@gmail.com',
    password: 'task.logistic.test',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    from: {
      name: "Debug Mail",
      email: "nirav@logisticinfotech.com",
    },
    to: {
      name: "",
      email: "nirav@logisticinfotech.com",
    },
  },
  datastores: {
    default: {
      // adapter: 'sails-mysql',
      // url: 'mysql://sailstest:sailstest@192.168.0.77:3306/sailstest'
      adapter: 'sails-mongo',
      url: 'mongodb://localhost:27017/product-demo',
    }
  },
  models: {
    migrate: 'alter',
    connect: 'sails-mongo'
  },
  custom: {

    baseUrl: 'http://localhost:1337',
  },

  //   /****** Hood twilio ******/
  //   twilioSid: "AC3ab15b8a2ec65785e01b190b56852f62",
  //   twilioauthToken: "ca3385ee1e9c2c830d425f58bae13a7e",
  //   twiliomobilenumber: "+17865098772",

  url: {
    appURL: "http://localhost:1337",
    applicationURL: "http://localhost:1337",
  },

};
