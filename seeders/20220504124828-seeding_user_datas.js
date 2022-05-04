"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("Users", [
      {
        username: "James",
        email: "jameskirawan@aibohphobia.com",
        password: "secret",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", [
      {
        username: "James",
      },
    ]);
  },
};
