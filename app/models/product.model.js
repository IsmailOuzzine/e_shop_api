module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
        id : {
            type : Sequelize.UUID,
            defaultValue : Sequelize.UUIDV4,
            primaryKey : true
        },
        name : {
            type : Sequelize.STRING,
            allowNull : false
        },
        price : {
            type : Sequelize.DOUBLE(10, 2),
            allowNull : false
        },
        stock : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        promotion : {
            type : Sequelize.TINYINT,
            allowNull : false
        },
        infos : {
            type : Sequelize.TEXT,
            allowNull : false
        }
    });
    return Product;
}