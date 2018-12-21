const router = require('express').Router()
const {Grow, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Grow.findAll({
        include: [{model: User}]
    })
        .then(items => res.json(items))
        .catch(next)
})

router.post('/', (req, res, next) => { 
    Grow.create(req.body)
        .then(item => res.json(item))
        .catch(next); 
})
