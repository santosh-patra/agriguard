import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';
import Category from './categorySchema.js';

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

// Define the relationship
Product.belongsTo(Category);
Category.hasMany(Product);

export default Product;
