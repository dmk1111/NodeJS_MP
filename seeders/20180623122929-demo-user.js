'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
          guid: "8f9a451f-b403-4130-a434-6461ae385045",
          isActive: true,
          balance: "$2,108.00",
          picture: "http://placehold.it/32x32",
          age: 26,
          eyeColor: "green",
          firstName: "John",
          lastName: "Doe",
          username: "jdoe",
          company: "TROLLERY",
          email: "jdoe@trollery.biz",
          phone: "+1 (805) 535-9494",
          address: "884 Kenmore Court, Winston, North Dakota, 9700",
          about: "Fugiat ex sit qui elit cupidatat cupidatat proident commodo non. Cillum laborum elit voluptate cillum. Duis duis fugiat nulla reprehenderit id ex.",
          registered: "Wednesday, March 11, 2017 11:50 AM",
          greeting: "Hello, John! You have 7 unread messages.",
          favoriteFruit: "banana",
          createdAt: new Date(),
          updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
