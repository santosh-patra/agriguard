import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';
const Attribute = sequelize.define('Attribute', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    value: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    regular_price: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    sale_price: {
        type: DataTypes.STRING,
        defaultValue:null,
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

export default Attribute;
