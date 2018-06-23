'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    index: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN,
    productName: DataTypes.STRING,
    price: DataTypes.STRING,
    picture: DataTypes.STRING,
    color: DataTypes.STRING,
    company: DataTypes.STRING,
    address: DataTypes.STRING,
    about: DataTypes.TEXT,
    produced: DataTypes.DATE,
    amount: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};