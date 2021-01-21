const {Reimbursment, Employee} = require('../models')
const uploadFile = require("../middleware/upload");

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

    static async add(req, res, next) {
        try {
            await uploadFile(req, res);
            if (req.file == undefined) {
                return res.status(400).send({ message: "Please upload a file!" });
            }

            req.body.attachment = 'http://localhost:3000/upload/' + req.file.originalname
            Reimbursment.create(req.body)
            res.status(200).send({
                message: "Add Reimburst Success!",
            });
        } catch (err) {
            next(err)
            console.log(err, "<<<<<<<<ERRORRR")
        }
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