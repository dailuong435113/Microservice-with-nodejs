const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('ecommerce_fullstack', 'user', 'secret', {
  host: 'db',
  dialect: 'mysql',
  port: '3306',
  // dialectOptions: {
  //   authentication: {
  //     type: 'sha256_password'
  //   }
  // }
});
module.exports = sequelize;
