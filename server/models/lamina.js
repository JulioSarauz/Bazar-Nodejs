const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-beautiful-unique-validation');

let Schema = mongoose.Schema;

let laminaSchema = new Schema({

    numero: {
        type: Number,
        unique: true,
        required: [true, 'El numero de la lamina es necesario']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre de la lamina es necesario']
    },
    numero_seccion: {
        type: Number,
        unique: false,
        required: [true, 'El numero de seccion es necesario']
    },

    seccion: {
        type: String,
        require: [true, 'El nombre de la seccion es necesario']
    }
});

laminaSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Lamina', laminaSchema);