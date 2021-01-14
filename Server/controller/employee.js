const { Employee } = require('../models')
const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class Controller {
    static login(req, res, next) {
        const { employee_id, password } = req.body
        Employee.findOne({
            where: {
                employee_id
            }
        })
            .then(data => {
                if (!employee_id || !password) throw ({ msg: "password or employee id cannot be empty!", code: 400 })
                if (!data) throw ({ msg: "invalid employee id or password!", code: 400 })
                // if (data.role != 'admin') throw ({ msg: "you're not admin!", code: 401 })
                let checkPass = compare(password, data.password)
                if (!checkPass) throw ({ msg: "invalid id or password!", code: 400 })
                let param = {
                    id: data.id,
                    employee_id: data.employee_id,
                    employee_role: data.employee_role
                }
                let token = generateToken(param)
                res.status(200).json(token)
            })
            .catch(err => {
                next(err)
            })
    }

    static profile(req, res, next) {
        Employee.findAll({
            where : {
                id : req.employeeId
            }
        })
        .then(data => {
            res.status(200).json(data[0])
        })
        .catch(err => {
            next(err)
            console.log(err,"<<<<<<<<ERRORRR")
        })
    }

    static allprofile(req, res, next) {
        Employee.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
            console.log(err,"<<<<<<<<ERRORRR")
        })
    }

    static adminLogin(req, res, next) {
        const { employee_id, password } = req.body
        Employee.findOne({
            where: {
                employee_id
            }
        })
            .then(data => {
                if (!employee_id || !password) throw ({ msg: "password or employee id cannot be empty!", code: 400 })
                if (!data) throw ({ msg: "invalid employee id or password!", code: 400 })
                if (data.employee_role != 'admin') throw ({ msg: "you're not admin!", code: 401 })
                let checkPass = compare(password, data.password)
                if (!checkPass) throw ({ msg: "invalid id or password!", code: 400 })
                let param = {
                    id: data.id,
                    employee_id: data.employee_id,
                    employee_role: data.employee_role
                }
                let token = generateToken(param)
                res.status(200).json(token)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller