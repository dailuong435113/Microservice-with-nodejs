'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        email: 'john.doe@example.com',
        password: 'password123',
        username: 'john_doe',
        address: '123 Main St',
        sex: 'Male',
        phone: '1234567890',
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'jane.smith@example.com',
        password: 'password123',
        username: 'jane_smith',
        address: '456 Elm St',
        sex: 'Female',
        phone: '0987654321',
        groupId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
