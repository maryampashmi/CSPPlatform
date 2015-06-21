/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Dependencies = require('./dependencies.model');

exports.register = function(socket) {
  Dependencies.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Dependencies.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('dependencies:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('dependencies:remove', doc);
}