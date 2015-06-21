/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/providers/:providerId/rating', require('./api/provider/rating'));
  app.use('/api/certificate/dependencies', require('./api/dependencies'));


  app.use('/api/wikis', require('./api/wiki'));

  app.use('/api/providers/:providerId/certificates', require('./api/provider/certificates'));

  app.use('/api/providers/:providerId/certificates/:certificateId/certControllers', require('./api/provider/certificates/certClauses'));
  app.use('/api/providers/:providerId/certificates/:certificateId/certControllers/:certCtrId/certSubControllers', require('./api/provider/certificates/certClauses/certSubClauses'));

  app.use('/api/poll/security', require('./api/poll/security'));
  app.use('/api/poll/privacy', require('./api/poll/privacy'));
  app.use('/api/poll/legal', require('./api/poll/legal'));
  app.use('/api/polls', require('./api/poll'));

  app.use('/api/providers/:providerId/posts/:postId/comments/:commentId/replies', require('./api/provider/post/comment/reply'));

  app.use('/api/providers/:providerId/posts/:postId/comments', require('./api/provider/post/comment'));

  app.use('/api/providers/:providerId/posts', require('./api/provider/post'));
  app.use('/api/providers', require('./api/provider'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));



  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
