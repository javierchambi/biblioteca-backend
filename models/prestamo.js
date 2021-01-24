const { Schema, model} = require('mongoose');

const prestamoSchema = Schema({

    fechaPrestamo: {
        type: Date,
        default: Date.now,
        required: true

    },

    fechaDevolucion:{
        type: String,
        required: true,
    },
    
    img:{
        type: String
    },
    
    libro:{ 
        required: true,       
        type: Schema.Types.ObjectId,
        ref: 'Libro'        
    },

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

prestamoSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
   
    return object;
})

module.exports = model('Prestamo',prestamoSchema);