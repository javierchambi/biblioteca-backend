const { Schema, model} = require('mongoose');

const libroSchema = Schema({

    titulo:{
        type: String,
        required: true
    },
    
    autor:{
        type: String,
        required: true,
        default: 'anonimo'
    },

    img:{
        type: String,
    },

    fechaPublicacion:{
        type: String,
        required: false,
    },

    editorial:{
        type: String,
        required: false,
    },

    categoria:{
        type: String,
        required: false,
    },   

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

libroSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
   
    return object;
})

module.exports = model('Libro',libroSchema);