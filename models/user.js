'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    index: DataTypes.INTEGER,
    guid: DataTypes.UUID,
    isActive: DataTypes.BOOLEAN,
    balance: DataTypes.STRING,
    picture: DataTypes.STRING,
    age: DataTypes.INTEGER,
    eyeColor: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    encryptedPass: DataTypes.STRING,
    company: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    about: DataTypes.TEXT,
    registered: DataTypes.DATE,
    greeting: DataTypes.STRING,
    favoriteFruit: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};