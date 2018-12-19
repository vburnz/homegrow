const Sequelize = require('sequelize')
const db = require('../db')

const Grow = db.define('grow', {
    item: {
        type: Sequelize.STRING
    }, 
    quantity: {
        type: Sequelize.INTEGER
    }, 
    price: { 
        type: Sequelize.DECIMAL
    }
    //need to connect to seller somehow but maybe that should happen in the associations file
}); 

module.exports = Grow; 