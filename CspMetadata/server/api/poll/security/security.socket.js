/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Security = require('./security.model.js');

exports.register = function(socket) {
  Security.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Security.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('security:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('security:remove', doc);
}
