module.exports = (sequelize, Sequelize) => {
    return sequelize.define('category', {
        id : {
            type : Sequelize.STRING,
            primaryKey : true
        },
        name : {
            type : Sequelize.STRING,
            allowNull: false
        },
        description : {
            type : Sequelize.TEXT,
            allowNull: false
        },
    });
}