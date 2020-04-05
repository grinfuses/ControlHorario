'use strict';
//var aux = require('../aux.js');

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('../../config'),
  aux = require('./aux.js'),
  Registros = mongoose.model('Registros');

exports.list_all_registros = function(req, res) {
  Registros.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.add_registro = function(req, res) {
  var data = req.body;
  var hora_entrada = req.body.horaEntrada;
  var hora_salida = req.body.horaSalida;
  var horas_laborables = req.body.horasLaborables;
  var a = hora_entrada.split(':'); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var secondsa = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
  var b = horas_laborables.split(':'); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var secondsb = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]); 
  var segundos_entrada = secondsa+secondsb;

  var hour_suma = Math.floor(segundos_entrada / 3600);
  hour_suma = (hour_suma < 10)? '0' + hour_suma : hour_suma;
  var minute_suma = Math.floor((segundos_entrada / 60) % 60);
  minute_suma = (minute_suma < 10)? '0' + minute_suma : minute_suma;
  var second = segundos_entrada % 60;
  second = (second < 10)? '0' + second : second;
  var hora_entrada_suma = hour_suma + ':' + minute_suma + ':' + second;
  console.log(hora_entrada_suma);

  var salida ="";    
  var inicioMinutos = parseInt(hora_entrada_suma.substr(3,2));
  var inicioHoras = parseInt(hora_entrada_suma.substr(0,2));
  
  var finMinutos = parseInt(hora_salida.substr(3,2));
  var finHoras = parseInt(hora_salida.substr(0,2));

  var transcurridoMinutos = finMinutos - inicioMinutos;
  var transcurridoHoras = finHoras - inicioHoras;
  
  if (transcurridoMinutos < 0) {
    transcurridoHoras--;
    transcurridoMinutos = 60 + transcurridoMinutos;
  }
  
  var horas = transcurridoHoras.toString();
  var minutos = transcurridoMinutos.toString();
  
  if (horas.length < 2) {
    horas = "0"+horas;
  }
  
  if (horas.length < 2) {
    horas = "0"+horas;
  }
  var result = horas+":"+minutos;
  console.log(result);
  data.saldoHorario = result;
  var new_task = new Registros(data);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Registros.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_registro = function(req, res) {
  Registros.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.buscar = function(req, res) {
  var fecha_desde = req.params.fecha_inicio;
  var fecha_hasta = req.params.fecha_fin;
  console.log("Desde: "+fecha_desde);
  console.log("Hasta: "+fecha_hasta);
  Registros.find({dia:{
    $gte: fecha_desde,
    $lte: fecha_hasta
  }}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

};


exports.deleteregistro = function(req, res) {
  Registros.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

