
const Sequelize = require('sequelize');


const connection = require('../database/database');

const Especialidade = connection.define(
    'tbl_especialidade',
    {
        nome_especialidade:{
           type: Sequelize.STRING,
           allowNull: false
        }
    }
);

//Especialidade.sync({force:true});

module.exports = Especialidade;