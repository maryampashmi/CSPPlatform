/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CertClauses = require('./certClauses.model.js');

exports.register = function(socket) {
  CertClauses.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  CertClauses.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('certClauses:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('certClauses:remove', doc);
}
