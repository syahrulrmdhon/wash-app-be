const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
  if (!req.body.customer_name) {
    res.status(400).send({
      message: "Customer name can not be empty!",
    });
    return;
  }

  // Create a Order
  const order = {
    customer_name: req.body.customer_name,
    amount: req.body.amount,
    total_price: req.body.total_price,
    washed: req.body.washed || false,
  };

  // Save Order in the database
  Order.create(order)
    .then((data) => {
      res.send({
          data,
          status: 200,
          statusText: "Order has been created sucessfully"
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  const customer_name = req.query.customer_name;
  let condition = customer_name
    ? { customer_name: { [Op.iLike]: `%${customer_name}%` } }
    : null;
  Order.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single Order with an id
exports.findOne = (req, res) => {};

// Update a Order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Order with id=${id}`,
      });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Order with id=${id}`,
      });
    });
};

// Find all washed Order
exports.findAllWashed = (req, res) => {
  Order.findAll({ where: { washed: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};
