import app from "./server/app.js";
import sequelize from './config/mysqlconfig.js';
const PORT = 8080;

// sequelize.sync()
    // .then(() => {
        app.listen(PORT,()=>{
            console.log("Database & tables Synced!");
            console.log(`Server is running on PORT ${PORT}`);
        })
    // })
    // .catch(err => console.log(err));

