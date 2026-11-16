require ("dotenv").config();
module.exports = {
    development:{
        username:process.env.DB_USER,
        password:process.env.DB_PASSWORD, 
        database:process.env.MIGRATION_DB_NAME || process.env.DB_NAME,
        host:process.env.DB_HOST, 
        dialect:"mysql"
    }
};