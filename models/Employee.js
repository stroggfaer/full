const Sequelize = require('sequelize');
const db = require('../config/db')

module.exports =  db.define('employee', {
    // attributes
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true
    // },
    department_id: {
        type: Sequelize.INTEGER,
       // primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName	: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    }
},{
    freezeTableName: true,
});