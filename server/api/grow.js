const router = require('express').Router()
const {Grow} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Grow.findAll()
        .then( items => res.json(items))
        .catch(next)
})
