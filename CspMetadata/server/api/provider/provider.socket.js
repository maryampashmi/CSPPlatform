/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Provider = require('./provider.model');

exports.register = function(socket) {
  Provider.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Provider.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('provider:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('provider:remove', doc);
}