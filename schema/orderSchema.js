import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';

const Orders = sequelize.define('Orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    farmer_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    order_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_order: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_status: {
        type: DataTypes.STRING,
        allowNull: false
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
