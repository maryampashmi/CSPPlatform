/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Legal = require('./legal.model.js');

exports.register = function(socket) {
  Legal.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Legal.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('legal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('legal:remove', doc);
}
