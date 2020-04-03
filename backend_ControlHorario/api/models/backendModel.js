'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RegistroSchema = new Schema({
  name: {
    type: String,
    required: 'usuario'
  },
  horaEntrada: {
    type: Date,
    default: Date.now
  },
  horaSalida: {
    type: Date,
  }
});

module.exports = mongoose.model('Registros', RegistroSchema);
