const path = require('path');
const fs =require('fs');

const { response} = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    
    //validar tipos
    const tiposValidos = ['libros','prestamos','usuarios'];
    if( !tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'no es un libros, prestamos, usuarios (tipos)'
        });
    }

    //validar que exista un archivo para enviar
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'no hay ninguj archivo'
        });
      }

      //procesar imagen...

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if( !extensionesValidas.includes( extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'no es una extension permitida'
        });
    }

    //generar el nombre del archivo
    const nombreArchivo = `${ uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo}`;

  // mover la imagen    
  file.mv(path, (err) => {
      if (err){
        console.log(err);
        return res.status(500).json({
            ok:true,
            msg: 'error al mover la imagen'
        });
      }

      //actualizar la base de datos
      actualizarImagen(tipo, id,nombreArchivo);

      res.json({
        ok:true,
        msg: 'archivo subido',
        nombreArchivo
    });
    });

    
};

const retornaImagen = (req, res) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);

    //imagen por defecto
    if ( fs.existsSync(pathImg)){
        res.sendFile ( pathImg);
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile ( pathImg);
    }

    
    
}

module.exports = {
    fileUpload,
    retornaImagen
}