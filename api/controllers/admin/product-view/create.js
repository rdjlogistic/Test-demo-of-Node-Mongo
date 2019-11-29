module.exports = {
  friendlyName: "Create",

  description: "Create admin.",

  inputs: {
    userId: {
      type: "string",
      required: true,
    },
    productId: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'ref',
      columnType:'datetime',
      required: true,
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

    var usersList = await User.find({});
    var productList = await Product.find({});

    for (let index = 0; index < 50; index++) {

      var start = new Date(2019, 0, 1);
      var end = new Date();
      var newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      inputs.userId = usersList[index].id;
      inputs.productId = productList[index].id;
      inputs.date = newDate;
      await ProductView.create(inputs);
    }


    this.req.session.flash = {
      type: "success",
      message: "Product-view create successfully",
    };
    throw {
      redirect: "/admin/product-view",
    };
  },
};
