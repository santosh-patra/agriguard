import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';

const Farmer = sequelize.define('Farmer', {
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
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    middle_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mobile_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
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
    },
    crop_insured: {
        type: DataTypes.STRING,
        allowNull: true
    },
    farm_details: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});



export default Farmer;
