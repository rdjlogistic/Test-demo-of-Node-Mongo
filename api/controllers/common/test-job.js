module.exports = {


  friendlyName: 'Test job',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    console.log('its working 1111');
    
    Jobs.create("demoJob", {priority:'low'}).priority('low').attempts(5).save(function (err) {
      return exits.success();
    });

    Jobs.create("demoJob", {priority:'high'}).priority('high').attempts(5).save(function (err) {
      return exits.success();
    });
  }
};
