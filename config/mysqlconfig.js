// import mysql from 'mysql';
// import { promisify } from 'util';

// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'mydb',
//     port: 3306
// });
// // let connection = mysql.createConnection('mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');

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

const sequelize = new Sequelize('mydb', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;
