module.exports = {


  friendlyName: 'View Product',


  description: 'Display Product.',


  inputs: {

  },


//   exits: {
//     success: {
//     }
//   },


  fn: async function(inputs, exits) {
    // console.log("project-data req : ", this.req.query);


    // let result = await sails.helpers.datatable(Project, this.req.query);
    let result = await sails.helpers.datatable.with({
        model: Product,
        options: this.req.query
      });
    // console.log("project-data resultProjects : ", result);
    return exits.success(result);
  }


};
