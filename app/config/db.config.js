module.exports = {
    HOST : 'localhost',
    DB : 'e_shop',
    USER : 'root',
    password : '',
    dialect : 'mysql',
    pool : {
        max : 5,
        min : 0,
        acquire: 30000,
        idle: 10000
    }
};