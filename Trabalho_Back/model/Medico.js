
const Sequelize = require('sequelize');


const connection = require('../database/database');


const Especialidade = require('./Especialidade');

const Medico = connection.define(
    'tbl_medico',
    {
        nome_medico:{
            type: Sequelize.STRING,
            allowNull: false
        },
        telefone_medico:{
            type: Sequelize.STRING,
            allowNull: false
        },
        Foto_Medico:{
            type: Sequelize.STRING,
            allowNull: false
        },
        Foto_CRM:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email_medico:{
            type: Sequelize.STRING,
            allowNull: false
        },
        celular_medico:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);



Especialidade.hasMany(Medico);



Medico.belongsTo(Especialidade);

//Medico.sync({force:true});

module.exports = Medico;