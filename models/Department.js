const Sequelize = require('sequelize');
const db = require('../config/db')

module.exports =  db.define('department', {
    // attributes
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true
    // },
    name: {
        type: Sequelize.STRING
    },
    description: {
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