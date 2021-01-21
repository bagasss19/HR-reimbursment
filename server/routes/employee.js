const route = require('express').Router()
const Controller = require('../controller/employee')
const {authentication} = require('../middleware/authentication')

route.post('/', Controller.login)
route.post('/admin', Controller.adminLogin)
route.get('/allprofile', Controller.allprofile)
route.use(authentication)
route.get('/', Controller.profile)

module.exports = route