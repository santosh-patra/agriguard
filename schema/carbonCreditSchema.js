import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';
const CarbonCredit = sequelize.define('CarbonCredit', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    farmer_id: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    email_id: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    mobile_no: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    },
    farm_size: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    land_use: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    land_use_image: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    },
    source: {
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

export default CarbonCredit;
