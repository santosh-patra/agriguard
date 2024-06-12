import mysql from 'mysql';
// import { promisify } from 'util';

// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'mydb',
//     port: 3306
// });

// connection.connect(function (err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('MYSQL Connected Successfully ' + connection.threadId);
// });

// connection.query = promisify(connection.query);
// // connection.end = promisify(connection.end);


// export default connection;

import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();
// for local user connect
const sequelize = new Sequelize(`mydb`, `root`, `admin`, {
    host: `localhost`,
    dialect: 'mysql'
});

// for cloud connect
// let user = process.env.USER;
// let password = process.env.PASSWORD
// let DB = process.env.DB
// let host = process.env.HOST
// let dbPORT = process.env.DBPORT
// let dialect = process.env.dialect
// const serviceURI = `${dialect}://${user}:${password}@${host}:${dbPORT}/${DB}`;
// const sequelize = new Sequelize(serviceURI,{
//   dialect: 'mysql',
//   dialectOptions: {
//       ssl: {
//           require: true,
//           rejectUnauthorized: false
//       }
//     }
//   });
  sequelize.authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });

export default sequelize;

