'use strict';
module.exports = function(app) {
  var express = require('express');
  var backend = require('../controllers/backendController');
  // backend Routes
  app.route('/registros').get(backend.list_all_registros);
  app.route('/nuevoregistro').post(backend.add_registro);
  app.route('/modificaregistro').post(backend.update_registro);
};
