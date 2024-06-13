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
        allowNull: true
    },
    first_name: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    middle_name: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    mobile_no: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    email_id: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    photo: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    },
    age: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT('long'),
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
    },
    crop_insured: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    },
    farm_details: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    }
},{
    hooks: {
        beforeCreate: async (farmer, options) => {
            const latestFarmer = await Farmer.findOne({
                order: [['createdAt', 'DESC']]
            });

            let newId = 100;  // Starting ID
            if (latestFarmer && latestFarmer.farmer_id) {
                const latestId = parseInt(latestFarmer.farmer_id.split('_')[1], 10);
                newId = latestId + 1;
            }
            farmer.farmer_id = `FAM_${newId}`;
        }
    },
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});



export default Farmer;
