const express = require('express');

const Especialidade = require('../model/Especialidade');


const router = express.Router();

router.post('/especialidade/cadastrarEspecialidade',
    (req, res)=>{
       
        
        let { nome_especialidade } = req.body;

        Especialidade.create(
            {nome_especialidade}
        ).then(
            ()=>{
                res.send('DADOS DE ESPECIALIDADE INSERIDOS COM SUCESSO!');
            }
        );

    }
);

router.get('/especialidade/listarEspecialidade',
    (req, res)=>{
        Especialidade.findAll()
                 .then(
                     (especialidades)=>{
                        res.send(especialidades);
                     }
                 );
    }
);


router.get( '/especialidade/listarEspecialidade/:id', (req, res)=>{

    let {id} = req.params;
    Especialidade.findByPk(id)
             .then(
                 (especialidade)=>{
                    res.send(especialidade);
                }
    );

});

router.post('/Especialidade/alterarEspecialidade',(req, res)=>{

    
        let {id, nome_especialidade} = req.body;

        Especialidade.update(
                {nome_especialidade},
                {where: {id}}
        ).then(
            ()=>{
                res.send('DADOS DE ESPECIALIDADE ALTERADOS COM SUCESSO!');
            }
        );

    }
);

router.delete('/especialidade/excluirEspecialidade',(req, res)=>{

        let {id} = req.body;

        Especialidade.destroy(
            {where: {id}}
        ).then(

            ()=>{
                res.send('Especialidade EXCLUÍDO COM SUCESSO!');
            }

        );

    }
);

module.exports = router;