const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT, // Sử dụng TEXT cho mô tả vì có thể dài hơn so với STRING
    allowNull: true, // Giả sử mô tả có thể không bắt buộc
  },
  price: {
    type: Sequelize.TEXT, // Sử dụng TEXT cho mô tả vì có thể dài hơn so với STRING
    allowNull: true, // Giả sử mô tả có thể không bắt buộc
  },
  image: {
    type: Sequelize.STRING, // Giả sử đường dẫn hình ảnh được lưu dưới dạng chuỗi
    allowNull: true, // Giả sử hình ảnh có thể không bắt buộc
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
});


module.exports = Product;