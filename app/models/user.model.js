module.exports = (sequelize, Sequelize) => {
    return sequelize.define("User", {
        id : {
            type : Sequelize.UUID,
            defaultValue : Sequelize.UUIDV4,
            primaryKey : true
        },
        name : {
            type : Sequelize.STRING,
            allowNull : false
        },
        familyName : {
            type : Sequelize.STRING,
            allowNull : false
        },
        email : {
            type : Sequelize.STRING,
            unique : true,
            allowNull : false
        },
        password : {
            type : Sequelize.STRING,
            allowNull : false
        },
        roles : {
            type : Sequelize.STRING,
            allowNull : false
        },
    })
}