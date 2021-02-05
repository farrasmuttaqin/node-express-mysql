module.exports = app => {

  function logOriginalUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }

  function logMethod (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  }

  var logStuff = [logOriginalUrl, logMethod];

  app.use('/customers', logStuff);

  app.prefix('/customers',  function (customer) {
    
    const customers = require("../controllers/customer.controller.js");

    customer.route('/').get(customers.findAll);
    customer.route('/').post(customers.create);
    customer.route('/').delete(customers.deleteAll);
    customer.route('/:customerId').get(customers.findOne).delete(customers.delete).put(customers.update);

  });

};

// module.exports = app => {
//   const customers = require("../controllers/customer.controller.js");

//   // Create a new Customer
//   app.post("/customers", customers.create);

//   // Retrieve all Customers
//   app.get("/customers", customers.findAll);

//   // Retrieve a single Customer with customerId
//   app.get("/customers/:customerId", customers.findOne);

//   // Update a Customer with customerId
//   app.put("/customers/:customerId", customers.update);

//   // Delete a Customer with customerId
//   app.delete("/customers/:customerId", customers.delete);

//   // Create a new Customer
//   app.delete("/customers", customers.deleteAll);
// };
