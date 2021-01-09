module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      customer_name: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      total_price: {
        type: Sequelize.STRING
      },
      washed: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Order;
  };