module.exports = app => {
    const orders = require("../controllers/order.controllers");
  
    var router = require("express").Router();
  
    // Create a new Order
    router.post("/", orders.create);
  
    // Retrieve all Orders
    router.get("/", orders.findAll);
  
    // Retrieve all published Orders
    router.get("/washed", orders.findAllWashed);
  
    // Retrieve a single Order with id
    // router.get("/:id", orders.findOne);
  
    // Update a Order with id
    router.put("/:id", orders.update);
  
    // Delete a Order with id
    router.delete("/:id", orders.delete);
  
  
    app.use('/api/orders', router);
  };