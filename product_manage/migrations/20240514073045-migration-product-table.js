'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT, // Dùng TEXT cho mô tả vì có thể chứa nhiều ký tự hơn
        allowNull: true, // Cho phép giá trị NULL nếu không có mô tả
      },
      price: {
        type: Sequelize.TEXT, // Dùng TEXT cho mô tả vì có thể chứa nhiều ký tự hơn
        allowNull: true, // Cho phép giá trị NULL nếu không có mô tả
      },
      image: {
        type: Sequelize.STRING, // Lưu đường dẫn đến hình ảnh
        allowNull: true, // Cho phép giá trị NULL nếu không có hình ảnh
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Giá trị mặc định là thời điểm hiện tại
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Giá trị mặc định là thời điểm hiện tại, được cập nhật khi có thay đổi
      }
    });
  }
};
