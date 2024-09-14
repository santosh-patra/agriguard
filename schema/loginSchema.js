import { DataTypes,Op } from 'sequelize';
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
        type: DataTypes.ENUM('partner', 'fpo'),
        allowNull: false
    },
    user_id:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
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
    timestamps: true,  // This is the default setting, so you can omit it if not overriding
    hooks: {
        beforeCreate: async (user, options) => {
            // Determine the prefix based on the category
            const prefix = user.category === 'fpo' ? 'FPO' : 'PTR';

            // Get the last user with the same prefix
            const lastUser = await User.findOne({
                where: {
                    user_id: {
                        [Op.like]: `${prefix}%`
                    }
                },
                order: [['id', 'DESC']]
            });

            // Extract the numeric part of the last user_id and increment it
            const lastNumber = lastUser ? parseInt(lastUser.user_id.slice(3), 10) : 99;
            user.user_id = `${prefix}${lastNumber + 1}`;
        }
    }
});

export default User;
