const router = require('express').Router()
const {Grow, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    Grow.findAll({
        include: [{model: User}]
    })
        .then(items => res.json(items))
        .catch(next)
})

router.post('/', async (req, res, next) => { 
    Grow.create(req.body)
        .then(item => res.json(item))
        .catch(next); 
})

router.delete('/:itemId', async (req, res, next) => {
    Grow.destroy({where: {id: req.params.itemId}})
        .then(()=> res.status(204).end())
        .catch(next); 
})

router.put('/:itemId', async (req, res, next) => { 
    console.log(req.body.quntity)
    Grow.decrement('quantity', { 
        by: req.body.quantity, 
        where: {id: req.params.itemId }
    })
        .then(() => res.sendStatus(202).end())
        .catch(next); 
    // Grow.update({
    //     quantity: req.body.quantity
    // }, 
    // { 
    //     where: {id: req.params.itemId}, 
    //     returning: true, 
    //     plain: true
    // }).then(([numRows, rows])=> { 
    //     res.status(201).json(rows)
    // }).catch(next); 
})