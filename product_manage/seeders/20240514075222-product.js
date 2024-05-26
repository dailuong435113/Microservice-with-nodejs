'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products', [{
      name: 'Product 1',
      description: 'Description for Product 1',
      image: ''
    }, {
      name: 'Product 2',
      description: 'Description for Product 2',
      image: ''
    }, {
      name: 'Product 3',
      description: 'Description for Product 3',
      image: ''
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
