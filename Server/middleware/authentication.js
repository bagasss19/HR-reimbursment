const {Employee} = require('../models')
const {verifyToken} = require('../helper/jwt')

async function authentication(req,res,next) {
    try {
        let {token} = req.headers
        let decoded = verifyToken(token)
        let user = Employee.findOne({
            where : {
                employee_id : decoded.employee_id
            }
        })
        if (!user) throw {msg : "authentication failed", code : 401}
        // if (decoded.employee_role != 'admin') throw {msg : "you're not admin!", code : 401}
        req.employeeId = decoded.id
        next()
    } catch (err) {
        console.log(err,"ERRORR AUTHENTICATION")
        next(err)   
    }
}

async function adminAuthentication(req,res,next) {
    try {
        let {token} = req.headers
        let decoded = verifyToken(token)
        
        let user = Employee.findOne({
            where : {
                employee_id : decoded.employee_id
            }
        })
        if (!user) throw {msg : "authentication failed", code : 401}
        if (decoded.role != 'admin') throw {msg : "you're not admin!", code : 401}
        req.employeeId = decoded.id
        next()
    } catch (err) {
        console.log(err,"ERRORR AUTHENTICATION")
        next(err)   
    }
}



module.exports = {authentication, adminAuthentication}