import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    mobile_no: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    district: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    email_id: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acc_status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        defaultValue: 'Inactive',
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

export default User;
