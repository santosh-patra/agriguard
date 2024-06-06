import sequelize from '../config/mysqlconfig.js';
import Category from './categorySchema.js';
import Product from './productSchema.js';

sequelize.sync({ force: true })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch(err => console.log(err));
