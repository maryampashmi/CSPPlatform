/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Privacy = require('./privacy.model.js');

exports.register = function(socket) {
  Privacy.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Privacy.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('privacy:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('privacy:remove', doc);
}
