const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CartDetail = sequelize.define('cart_detail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cart: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carts',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Sequelize handles CURRENT_TIMESTAMP
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Use NOW and handle update logic in application logic or database trigger
    }
}, {
    // Additional Sequelize model settings as needed
});

module.exports = CartDetail;
