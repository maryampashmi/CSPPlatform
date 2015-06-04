/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Certificates = require('./certificates.model.js');

exports.register = function(socket) {
  Certificates.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Certificates.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('certificates:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('certificates:remove', doc);
}
