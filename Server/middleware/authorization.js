const {Reimbursment} = require('../models')

function authorization(req,res,next) {
    let id = req.params.id
    
    Reimbursment.findByPk(id)
    .then(data =>{
        if (!data) throw {msg : "Reimbursment not found!", code : 404}
        else if (data.employee_id != req.employeeId) throw {msg : "you're not authorized!", code : 401}
        else next()
    })
    .catch(err => {
        next(err)
    })
}


module.exports = {authorization}