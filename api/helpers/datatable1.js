var _ = require("lodash");
module.exports = {
  friendlyName: "Datatable",

  description: "Datatable something.",

  inputs: {
    model: {
      type: "ref",
      //   example: "9999999999",
      //   description: "The mobile number to whom we need to send sms",
      required: true,
    },
    options: {
      type: {},
      //   example: "9999999999",
      //   description: "The mobile number to whom we need to send sms",
      required: true,
    },
    dateFilter: {
      type: 'string',
      //   example: "9999999999",
      //   description: "The mobile number to whom we need to send sms",

    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function(inputs, exits) {
    let model = inputs.model; // Project; //inputs.model;
    let options = inputs.options;
    let filterBy = inputs.dateFilter;

    let start = options.start;
    let length = options.length;


    //default column options
    var _columns = [
      {
        data: "",
        name: "",
        searchable: false,
        orderable: false,
        search: {
          regex: false,
          value: "",
        },
      },
    ];

    //default datatable options
    var _options = {
      draw: 0,
      columns: _columns,
      start: 0,
      length: 10,
      search: {
        value: "",
        regex: false,
      },
      order: [
        {
          column: 0,
          dir: "asc",
        },
      ],
    };

    //merge both Object, options and _options into _options
    _.assign(_options, options);

    //response format
    var _response = {
      draw: _options.draw,
      recordsTotal: 0,
      recordsFiltered: 0,
      iTotalRecords: 0, //legacy
      iTotalDisplayRecords: 0, //legacy
      data: [],
    };

    var _reverse = {};

    var currentDate = new Date();
    var firstDay = "";
    var lastDay = "";
    if(filterBy === "week"){
      var currentWeekDay = currentDate.getDay();
      var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay
      firstDay = new Date(new Date(currentDate).setDate(currentDate.getDate()- lessDays));
      lastDay = currentDate;
    }else if(filterBy === "day"){
       firstDay = new Date(new Date().setHours(0,0,0,0));
       lastDay = currentDate;
    }else{
       firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
       lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    }

    //build where criteria
    var where = [],
      whereQuery = {},
      select = [];

    if (_.isArray(_options.columns)) {
      _options.columns.forEach(function(column, index) {
        // This handles the column search property
        if (_.isNull(column.data) || column.searchable == 'false'){
          return true;
        }
        if (_.isBoolean(column.reverse)) {
          var joinedModel = _.split(column.data, ".", 2)[0];
          var association = _.find(model.associations, ["alias", joinedModel]);
          if (_.isUndefined(association)) {
            _response["error"] = "Association " + joinedModel + " not found on this model:" + model.identity;
            return true;
          }
          _reverse.model = sails.models[association.model || association.collection];
          var joinCriteria = _.split(column.data, ".", 2)[1];
          if (_.isUndefined(joinCriteria)) {
            _reverse.criteria = {
              id: column.search.value,
            };
          } else {
            _reverse[joinCriteria] = column.search.value;
          }
          return true;
        }
        if (_.isPlainObject(column.search.value)) {
          if (column.search.value.from != "" && column.search.value.to != "") {
            whereQuery[column.data] = {
              ">=": column.search.value.from,
              "<": column.search.value.to,
            };
          }
        } else if (_.isString(column.search.value)) {
          var col = column.data.split(".")[0];

          if (!_.isEqual(column.search.value, "")) {
            // whereQuery[col] = column.search.value;
            if (col != "") {
              whereQuery[col] = column.search.value;
            }
          }
        } else if (_.isNumber(column.search.value)) {
          var col = column.data.split(".")[0];
          whereQuery[col] = column.search.value;
        } else if (_.isArray(column.search.value)) {
          var col = column.data.split(".")[0];
          whereQuery[col] = column.search.value;
        }

        // This handles the global search function of this column
        var col = column.data.split(".")[0];

        var filter = {};
        if (col != "") {
          filter[col] = {
            contains: _options.search.value,
          };

          select.push(col);
          where.push(filter);
        }
        // filter[col] = {
        //   contains: _options.search.value
        // };
      });
    }
    whereQuery['date'] = {
      ">=": firstDay,
      "<": lastDay,
    };
    whereQuery["or"] = where;

    console.log("datatable :whereQuery ", whereQuery);

    var sortColumn = {};
    var sortString = "";
    _.forEach(_options.order, function(value, key) {
      var sortBy = _options.columns[value.column].data;
      if (_.includes(sortBy, ".")) {
        sortBy = sortBy.substr(0, sortBy.indexOf("."));
      }
      var sortDir = value.dir == "asc" ? 1 : 0;
      sortColumn[sortBy] = sortDir;
      sortString = sortBy + " " + value.dir;
    });
    // console.log("datatable sortColumn = " + sortString);

    //find the database on the query and total items in the database data[0] and data[1] repectively
    if (!_.isEmpty(_response["error"])) {
      delete _response["data"];
      return new Promise(function(resolve, reject) {
        reject(_response);
      });
    }


    _response.recordsTotal = await model.count();
    _response.recordsFiltered = await model.count({
      where: whereQuery,
    });
    _response.iTotalRecords = _response.recordsTotal;
    _response.iTotalDisplayRecords = _response.recordsFiltered;

    _response.data = await model
      .find({
        where: whereQuery,
        skip: _options.start,
        limit: _options.length,
        //   sort: "createdAt DESC"
        //   sort: sortColumn

        sort: sortString,
      })
      .populateAll();

    // var db = User.getDatastore().manager;
    // var rawMongoCollection = db.collection('User').find({"email":{ $regex: /^ASDF/i}});
    // sails.log(rawMongoCollection);

    // var NAMES_OF_PETS_SQL = `db.getCollection('user').find({"email":{ $regex: /^ASDF/i}})`;

    // Send it to the database.
    // var rawResult = await User.native(NAMES_OF_PETS_SQL);

    // sails.log(rawResult);

    // console.log(cursor);
    return exits.success(_response);
  },
};

// module.exports.getColumns = function (model) {
//     if (!model) {
//         return new Promise(function (resolve, reject) {
//             reject({ error: 'Model doesn\'t exist' });
//         });
//     }
//     var attributes = _.keys(model._attributes);
//     return new Promise(function (resolve, reject) {
//         if (attributes) {
//             resolve(attributes);
//         } else {
//             reject({ error: 'Error fetching attribute for this model' });
//         }
//     })
// };
