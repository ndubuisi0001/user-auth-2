"use strict";
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("users", {
            id:{
                type:Sequelize.INTEGER,
                allowNull:false, 
                autoIncrement:true, 
                primaryKey:true
            },
            name:{
                type:Sequelize.STRING(100),
                allowNull:false
            },
            email:{
                type:Sequelize.STRING(150),
                allowNull:false,
                unique:true
            },
            password:{
                type:Sequelize.STRING(255),
                allowNull:false
            },
            role:{
                type:Sequelize.ENUM("user", "admin"),
                allowNull:false,
                defaultValue:"user"
            },
            createdAt:{
                type:Sequelize.DATE, 
                allowNull:false
            },
            updatedAt:{
                type:Sequelize.DATE,
                allowNull:false
            }
        });
    },
    async down (queryInterface){
        await queryInterface.dropTable("users");
    }
};