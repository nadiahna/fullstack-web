const db = require('../models');
const Employee = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //create employee
    const employee = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    //save employee to database
    Employee.create(employee)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while creating the employee."
        });
    });
      
};

    //retrive all Employee from database
exports.findAll = (req, res) => {
    const name = req.query.name;

    Employee.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error while get all employee."
        });
    });
};

    //find one with id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Employee.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error find id employee with id " + id
        });
    });
    }

        //update employee
    exports.update = (req, res) => {
        const id = req.params.id;

        Employee.update(req.body, {
            where: {id: id}
        })
        .then(num => {
            if (num == 1) {
                res.send({ 
                    message: "Employee was updated successfully."
                });
            } else {
                res.send({ 
                    message: "Cannot update Employee with id " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with id " + id
            });
        });
    };

         //delete employee by id
    exports.delete = (req, res) => {
        const id = req.params.id;

        Employee.destroy({
            where: {id: id}
        })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Employee was deleted successfully!"
                });
            } else {
                res.send({
                    message: "Cannot delete Employee with id " + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete employee with id " + id
            });
        });
    };