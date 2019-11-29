module.exports = {
  friendlyName: "Create",

  description: "Create admin.",

  inputs: {
    productName: {
      type: "string",
      required: true,
    },
    price: {
      type: 'number',
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
    for (let index = 0; index < 50; index++) {

      var result           = '';
      var testPrice = 1;
      var characters       = 'abcdefghijklmnopqrstuvwxyz';
      var numbes       = '1234567890';
      var charactersLength = characters.length;
      var numbesLength = numbes.length;
      for ( var i = 0; i < 5; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
         testPrice += numbes.charAt(Math.floor(Math.random() * numbesLength));
      }
      inputs.productName = result;
      inputs.price = testPrice;
      console.log('inputs', inputs);
      await Product.create(inputs);

    }


    this.req.session.flash = {
      type: "success",
      message: "Product create successfully",
    };
    throw {
      redirect: "/admin/product",
    };
  },
};
