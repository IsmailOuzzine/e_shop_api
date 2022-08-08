const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.password,
    {
        host : dbConfig.HOST,
        dialect : dbConfig.dialect,
        operatorAliases : false,
        pool : {
            max : dbConfig.pool.max,
            min : dbConfig.pool.min,
            acquire : dbConfig.pool.acquire,
            idle : dbConfig.pool.idle
        }
    }
);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.categories = require('./category.model')(sequelize, Sequelize);
db.products = require('./product.model')(sequelize, Sequelize);
db.users = require('./user.model')(sequelize, Sequelize);
db.categories.hasMany(db.products, { as : 'products' });
db.products.belongsTo(db.categories, { foreignKey : 'categoryId', as : 'category' });

module.exports = db;