const express = require('express')
const router = express.Router()
const path = require('path')
const Item = require('../../item')

router
    .route('/items')
    .get((req, res) => {
        res.json(Item.getAll());
    })
    .post((req, res) => {
        let newItem = new Item(req.body.name, req.body.price)
        return res.json({added: newItem})
    });

router
    .route('/items/:name')
    .get((req, res) => {
        res.json(Item.find(req.params.name))
    })
    .patch((req, res) => {
        let item = Item.update(req.params.name, req.body)
        res.json({updated: item})
    })
    .delete((req, res) => {
        let item = Item.delete(req.params.name)
        res.json({message: 'Deleted'})
    })

module.exports = router