const db = require('../models');
const Performance = db.performance;
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // if(!req.body.name) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    //create perfomance relation
    const performance = {
        id_reviewer: req.body.id_reviewer,
        id_reviewer_recipient: req.body.id_reviewer_recipient,
        reviewer: req.body.reviewer,
        reviewer_recipient: req.body.reviewer_recipient,
        score: req.body.score,
    };

    //save performance to database
    Performance.create(performance)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while creating relation."
        });
    });
      
};

    //retrive all Performance from database
exports.findAll = (req, res) => {
    const name = req.query.name;

    Performance.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error while get all perfomance reviews."
        });
    });
};

//find all by id_reviewer
exports.findAllByIdUser = (req, res) => {
    const id_reviewer = req.params.id;

    Performance.findAll({
            where: {
                id_reviewer : id_reviewer
            }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error while get all performance reviewed by you."
        });
    });
};

//find all reviews by id_reviewer_recipient
exports.findAllByIdRecipient = (req, res) => {
    const id_reviewer_recipient = req.params.id;

    Performance.findAll({
            where: {
                id_reviewer_recipient : id_reviewer_recipient
            }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error while get all performance reviewed by you."
        });
    });
};

    //find one by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Performance.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error find review employee with id " + id
        });
    });
    }

        //update performance
    exports.update = (req, res) => {
        const id = req.params.id;

        Performance.update(req.body, {
            where: {id: id}
        })
        .then(num => {
            if (num == 1) {
                res.send({ 
                    message: "Performance was updated successfully."
                });
            } else {
                res.send({ 
                    message: "Cannot update performance review"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating performance review"
            });
        });
    };

         //delete performance by id
    exports.delete = (req, res) => {
        const id = req.params.id;

        Performance.destroy({
            where: {id: id}
        })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Performance was deleted successfully!"
                });
            } else {
                res.send({
                    message: "Cannot delete performance"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete performance"
            });
        });
    };