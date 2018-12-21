const Sequelize = require('sequelize')
const db = require('../db')

const Labor = db.define('labor', {
    labor: {
        type: Sequelize.STRING
    }, 
    hours: {
        type: Sequelize.INTEGER
    }, 
    price: { 
        type: Sequelize.DECIMAL
    }
    //need to connect to seller somehow but maybe that should happen in the associations file
}); 

module.exports = Labor; 