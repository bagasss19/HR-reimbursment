const route = require('express').Router()
const Controller = require('../controller/admin')
const {authorization} = require('../middleware/authorization')

route.get('/', Controller.read)
route.post('/reimbursment', Controller.add)
route.put('/:id', Controller.edit)
route.delete('/:id', authorization ,Controller.delete)

module.exports = route