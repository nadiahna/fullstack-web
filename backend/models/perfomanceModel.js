module.exports = (sequelize, Sequelize) => {
    const Perfomance = sequelize.define("perfomance_reviews", {
        reviewer:{
            type: Sequelize.STRING
        },
        reviewer_recipient:{
            type: Sequelize.STRING
        },
        score:{
            type: Sequelize.STRING
        },
        id_reviewer:{
            type: Sequelize.INTEGER
        },
        id_reviewer_recipient:{
            type: Sequelize.INTEGER
        }
    });
  
    return Perfomance;
  };