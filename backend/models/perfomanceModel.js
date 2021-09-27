module.exports = (sequelize, Sequelize) => {
    const Perfomance = sequelize.define("performance_reviews", {
        id_reviewer:{
            type: Sequelize.INTEGER
        },
        id_reviewer_recipient:{
            type: Sequelize.INTEGER
        },
        reviewer:{
            type: Sequelize.STRING
        },
        reviewer_recipient:{
            type: Sequelize.STRING
        },
        score:{
            type: Sequelize.STRING
        },
    });
  
    return Perfomance;
  };