import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';
const SoilTest = sequelize.define('SoilTest', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    farmer_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    pincode: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    district: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    mobile_no: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    land_size: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    land_type: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    crop_name: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    soil_type: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    testing_status: {
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

export default SoilTest;
