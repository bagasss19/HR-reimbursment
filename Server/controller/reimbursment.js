const {Reimbursment, Employee} = require('../models')

class Controller {
    static read(req,res,next) {
        Reimbursment.findAll({
            order : [['id', 'ASC']],
            include : [Employee],
            where : {
                employee_id : req.employeeId
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static readId(req,res,next) {
        console.log(req.params.id);
        Reimbursment.findOne({
            where : {
                id : req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
            console.log(err);
        })
    }

    static add (req,res,next) {
        req.body.employee_id = req.employeeId
        Reimbursment.create(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static edit (req,res,next) {
        Reimbursment.update(req.body, {
            where : {
                id : req.params.id
            },
            returning : true
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req,res,next) {
        Reimbursment.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(data => {
            res.status(200).json(`Reimbursment success to delete`)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller