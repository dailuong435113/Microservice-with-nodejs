const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('cart', {
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    },
});


module.exports = Cart;
