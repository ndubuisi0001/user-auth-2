require("dotenv").config();
const { Sequelize}=require("sequelize");
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER,
     process.env.DB_PASSWORD,
    {host:process.env.DB_HOST, 
        dialect:"mysql",
        logging:false
    }
);
const testConnection = async ()=> {
    try {
        await sequelize.authenticate();
        console.log("MYSQL database connected successfully.");
    }catch(error){
        console.error("unable to connect to the database:", error.message);throw error;
    }
};
module.exports = {sequelize, testConnection};