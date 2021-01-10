const route = require('express').Router()
const Controller = require('../controller/admin')
const {authorization} = require('../middleware/authorization')
const {authentication} = require('../middleware/authentication')

route.use(authentication)
route.get('/', Controller.read)
route.get('/:id', Controller.filterEmployee)
route.post('/reimbursment', Controller.add)
route.put('/:id', authorization, Controller.edit)
route.delete('/:id', authorization ,Controller.delete)

module.exports = route