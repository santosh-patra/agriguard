import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';

const Orders = sequelize.define('Orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    farmer_id:{
        type: DataTypes.STRING,
        allowNull: false
    },
    farmer_name: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    category_id:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    product_id:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    product_name: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    order_id: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    qty: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    },
    price: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    attribute: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    order_status: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    date_of_order: {
        type: DataTypes.STRING,
        allowNull: true
    },
    payment_status: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    decline_reason: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});

export default Orders;
