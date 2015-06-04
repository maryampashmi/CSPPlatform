/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Wiki = require('./wiki.model');

exports.register = function(socket) {
  Wiki.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Wiki.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('wiki:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('wiki:remove', doc);
}