const Sequelize = require('sequelize');
//
module.exports = new Sequelize('rendzh_ang', 'rendzh_ang', '12test_ang', {
    host: 'rendzh.beget.tech', // rendzh.beget.tech
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
