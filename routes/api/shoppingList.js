// Init router
const express = require('express');
const router = express.Router()

// get mongo model
const ShoppingList = require('../../models/ShoppingList')

router.get('/api/shopping', (req, res) => {
    ShoppingList.find()
    .then(data => {
        res.json({data: data})
    })
    .catch(err => {
        res.json({msg: 'Error', Error: err})
    }
)
})

router.post('/api/shopping', (req, res) => {
    if(!req.body.item) {
        res.status(400).json({err: 'You need to specify item to add'})
    } else {
        const newItem = new ShoppingList({
            item : req.body.item,
            quantity: req.body.quantity ? req.body.quantity : 1
        })
        if (req.body.price) {
            newItem.price = req.body.price
        }
        newItem.save()
        .then(data => {
            res.json({
                msg: 'Success! New item added',
                data: newItem
        })
    })
        .catch(err => {
            res.status(400).json({
                msg: 'Error! Something Went wrong',
                error: err
            })
        })
    }
})

router.delete('/api/shopping', (req, res) => {
    if(req.body.id) {
        ShoppingList.deleteOne({_id : req.body.id})
        .then(result => res.json({
            msg: `Success! Record with id ${req.body.id}`,
            data: result
        }))
        .catch(err => res.status(400).json({
            msg: `Error! Something went wrong`,
            error: err
        }))
    }
})


// export router
module.exports = router;