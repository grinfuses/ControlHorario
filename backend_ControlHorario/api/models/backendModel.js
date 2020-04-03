'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RegistroSchema = new Schema({
  name: {
    type: String
  },
  dia: {
    type: Date
  },
  horaEntrada: {
    type: String
  },
  horaSalida: {
    type: String
  },
  horasLaborables: {
    type: String
  },
  Observaciones: {
    type: String
  }
});

module.exports = mongoose.model('Registros', RegistroSchema);
