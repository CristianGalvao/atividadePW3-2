const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const router = express.Router();

const Medico = require('../model/Medico');

/***** MULTER - STORAGE *****/
/** GERENCIA O ARMAZENAMENTO DOS ARQUIVOS **/
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/');
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now().toString() + '_'+ file.originalname);
    }
});

/***** MULTER - FILTER *****/
/** GERENCIA O TIPO DE ARQUIVO QUE PODE SER RECEBIDO **/
const fileFilter = (req, file, cb)=>{

    if( file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ||  file.mimetype === 'image/png'){

        cb(null, true);

    }else{

        cb(null, false);

    }

}

/***** MULTER - UPLOAD *****/
/** EXECUTA O PROCESSO DE ARMAZENAMENTO **/
const upload = multer({
    storage: storage,
    limits:{ 
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/Medico/cadastrarMedico', upload.array('files', 2) ,(req, res)=>{

    console.log(req.files[0].path);
    console.log(req.files[1].path);
    console.log(req.body);
    
    const { nome_medico, telefone_medico, email_medico, celular_medico, tblEspecialidadeId} = req.body;
    const Foto_Medico = req.files[0].path;
    const Foto_CRM = req.files[1].path;
    // console.log(Foto_CRM, Foto_Medico)   Teste de envio das Imagens
    Medico.create(
        {
            nome_medico,
            telefone_medico,
            Foto_Medico,
            Foto_CRM,
            email_medico,
            celular_medico,
            tblEspecialidadeId 

        }
    ).then(
        ()=>{
            res.send('DADOS DO MEDICO INSERIDOS COM SUCESSO!');      
        }
    );

});

router.get('/Medico/listarMedico', (req, res)=>{

    Medico.findAll()
          .then((Medicos)=>{
              res.send(Medicos)
          });
});

router.get('/Medico/listarMedicoCodigo/:id', (req, res)=>{

    const { id } = req.params

    Medico.findByPk(id)
          .then((MedicoId)=>{
              res.send(MedicoId)
          });
});

router.delete('/Medico/excluirMedico/:id', (req, res)=>{

    const { id } = req.params;

    Medico.findByPk(id)
         .then((Medico)=>{

            const Foto_CRM = Medico.Foto_CRM;
            const Foto_Medico = Medico.Foto_Medico;

            Medico.destroy({
                where:{id}
            }).then(
                ()=>{
                    fs.unlink(Foto_Medico, (error)=>{

                        if(error){
                            console.log('ERRO AO EXLCUIR A IMAGEM: ' + error);
                        }else{
                            console.log('IMAGEM MEDICO EXCLUIDA COM SUCESSO! ');
                        } 
        
                    });

                    fs.unlink(Foto_CRM, (error)=>{

                        if(error){
                            console.log('ERRO AO EXLCUIR A IMAGEM: ' + error);
                        }else{
                            console.log('IMAGEM CRM EXCLUIDA COM SUCESSO! ');
                        } 
        
                    });

                    res.send('DADOS DO MEDICO EXCLUIDO COM SUCESSO');

                }
        );


    });

});

router.put('/Medico/editarMedico', upload.array('files', 2), (req, res)=>{

    const {nome_medico, telefone_medico, email_medico, celular_medico, id } =req.body;

    /**UPFDATE COM IMAGEM */
    if(req.files != ''){

        Medico.findByPk(id)
        .then((Medico)=>{

            let Foto_CRM = Medico.Foto_CRM;
            let Foto_Medico = Medico.Foto_Medico;

            fs.unlink(Foto_Medico, (error)=>{

                if(error){
                    res.send('ERRO AO EXLCUIR A IMAGEM: ' + error);
                }else{
                    res.send('IMAGEM PEQUENA EXCLUIDA COM SUCESSO! ');
                } 

            });

            /**Exclusão da imagem Grande */
            fs.unlink(Foto_CRM, (error)=>{

                if(error){
                    console.log('ERRO AO EXLCUIR A IMAGEM: ' + error);
                }else{
                    console.log('IMAGEM GRANDE EXCLUIDA COM SUCESSO! ');
                } 
            });

            Foto_Medico = req.files[0].path;
            Foto_CRM = req.files[1].path;

            /**ATUALIZAÇÃO DOS DADOS DO MEDICO */
            Medico.update(
                {nome_medico,
                Foto_CRM,
                Foto_Medico,
                telefone_medico,
                email_medico,
                celular_medico,
                tblEspecialidadeId},
                {where: {id}}
             ).then(
                 ()=>{
                     res.send('DADOS DO MEDICO ALTERADOS COM SUCESSO!');
                 }
             );

        });
    }else{

            /**UPFDATE SEM IMAGEM */
    Medico.update(
        {nome_medico,
         telefone_medico,
         email_medico,
         celular_medico},
         {where: {id}}
     ).then(
         ()=>{
             res.send('DADOS DE MEDICO ALTERADOS COM SUCESSO!');
         }
     );

    }

});

module.exports = router;