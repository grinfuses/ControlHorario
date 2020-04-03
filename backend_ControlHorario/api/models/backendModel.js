'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RegistroSchema = new Schema({
  name: {
    type: String
  },
  horaEntrada: {
    type: Date
  },
  horaSalida: {
    type: Date
  },
  horasLaborables: {
    type: Date
  },
  Observaciones: {
    type: String
  }
});

module.exports = mongoose.model('Registros', RegistroSchema);
