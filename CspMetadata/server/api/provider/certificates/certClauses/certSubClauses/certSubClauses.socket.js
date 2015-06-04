/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CertSubClauses = require('./certSubClauses.model.js');

exports.register = function(socket) {
  CertSubClauses.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  CertSubClauses.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('certSubClauses:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('certSubClauses:remove', doc);
}
