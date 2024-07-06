import { DataTypes } from 'sequelize';
import sequelize from '../config/mysqlconfig.js';
const Blog = sequelize.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    blog_title: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    blog_content: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    blog_image: {
        type: DataTypes.TEXT('long'),
        defaultValue: null,
        allowNull: true
    },
    video_url: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    video_thumbnail: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        defaultValue:null,
        allowNull: true
    },
    tags: {
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
    }
}, {
    timestamps: true  // This is the default setting, so you can omit it if not overriding
});

export default Blog;
