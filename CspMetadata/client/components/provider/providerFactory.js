/**
 * Created by pasma08 on 23/04/2015.
 */

angular.module('cspMetadataApp')
  .factory('providers', ['$http','Auth',function($http,Auth){
   // var urlBase = 'http://localhost:3000';
    var ob = {
       current: {},
        providers: []

    };
 //////////////////////////////////////////////*get all provider1-post-comment-reply*////////////////////////////////////

    /*get all providers*/
    ob.getAll = function() {
        return $http.get('/api/providers')
          .success(function(res){
            angular.copy(res, ob.providers);  //what is the different between res and res.data? how i change my provider page
        });                                  // if i use res.data and ob.current, as doesn't show me anything.
    };                                      //everything stored in this way res,ob.providers.
    /*get all posts*/
    ob.getAllPosts = function(provider) {    //for get all the post and comment if i need to pass any id or not??
        return $http.get('/api/providers/' + provider + '/posts')
            .success(function(res){
                //console.log('res', res);
                angular.copy(res, ob.current.posts);
            });
    };

    /*get all comment*/
    ob.getAllComments = function(provider,post) {
        return $http.get('/api/providers/'+ provider + '/posts/' + post +  '/comments')
          .success(function(res){
            //console.log('res', res);
            angular.copy(res, ob.current.comments);
        });
    };

    /*get all reply*/
    ob.getAllReplies = function(provider,post,comment) {
      return $http.get('/api/providers/'+ provider + '/posts/' + post+  '/comments/' + comment + '/replies')
        .success(function(res){
          //console.log('res', res);
          angular.copy(res, ob.current.replies);
        });
    };

///////////////////////////////////////////*get single provider1-post-comment-reply*////////////////////////////////////

    /*get one providers*/
    ob.get = function(id) {                     //pass provider1 id   //how to change this part. i have doubt if it is correct or not???
        return $http.get('/api/providers/' + id).success(function(res){
          //console.log('ob.current',ob.current);
            angular.copy(res, ob.current);
            // return res.data;
        });
    };

    /*get one post*/
    ob.getPost = function(providerId,id) {
        return $http.get('/api/providers/'+ providerId + '/posts/' + id).success(function(res){
          //  console.log("Get post response: ", res)
          //console.log('ob.current',ob.current);
            angular.copy(res, ob.current);

        });
    };

    /*get one comment*/
    ob.getComment = function(providerId,postId,id) {
        return $http.get('/api/providers/'+ providerId + '/posts/' + postId +  '/comments/'  + id).success(function(res){
          // console.log("Get comment response: ", res)
          //console.log('',ob.current);
            angular.copy(res, ob.current);
        });
    };



///////////////////////////////////////////*create provider1-post-comment-reply*////////////////////////////////////
    ob.create = function(provider) {  //create new provider1
        return $http.post('/api/providers', provider, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(data){
                ob.providers.push(data);
            });
    };

    ob.createRating = function(provider,rating) {
      console.log('in createPost inside FACTORY PROVIDER',provider);
      console.log('in createPost inside FACTORY Rating',rating);
      return $http.post('/api/providers/'+ provider._id + '/rating',rating, {
        headers: {Authorization: 'Bearer '+Auth.getToken()}
      }).success(function(data){
        _.forEach(ob.providers,function(value,index){
          if(value._id === provider._id){
            ob.providers[index].ratings.push(data);
          }
        })
        //console.log('ob.current in createRating inside providerFactory',ob.current.ratings);
        ob.current.ratings.push(data)
        // ob.provider1._id.posts.push(data);
      });
    };



      ob.createPost = function(provider,post) {
      console.log('in createPost inside FACTORY PROVIDER',provider);
      console.log('in createPost inside FACTORY POST',post);
        return $http.post('/api/providers/'+ provider._id + '/posts',post, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(data){
                _.forEach(ob.providers,function(value,index){
                    if(value._id === provider._id){
                        ob.providers[index].posts.push(data);
                    }
                })
              console.log('ob.current in createPost inside providerFactory',ob.current.posts);
              ob.current.posts.push(data)
               // ob.provider1._id.posts.push(data);
            });
    };



    //create new comment for post
    ob.createComment = function(provider, post,comment) {
      console.log('in createComment inside FACTORY PROVIDER',provider);
      console.log('in createComment inside FACTORY POST',post);
      console.log('in createComment inside FACTORY COMMENT',comment);

      return $http.post('/api/providers/'+ provider + '/posts/' + post._id + '/comments' ,comment, {
          headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(data){
          _.forEach(ob.posts,function(value,index){
            if(value._id === post._id){
              ob.posts[index].comments.push(data);
            }
          })
          console.log('ob.current in createComment inside providerFactory',ob.current.comments);
          ob.current.comments.push(data)
          // ob.provider1._id.posts.push(data);
        });
    };



    //create new reply for comment
    ob.createReply = function(providerId, postId,comment,reply) {
        return $http.post('/api/providers/'+ providerId + '/posts/' + postId + '/comments/'+ comment._id + '/replies' ,reply, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(data){
          _.forEach(ob.comments,function(value,index){
            if(value._id === comment._id){
              ob.comments[index].replies.push(data);
            }
          })
          console.log('ob.current in createComment inside providerFactory',ob.current.replies);
          ob.current.replies.push(data)
          // ob.provider1._id.posts.push(data);
        });
    };

///////////////////////////////////////////*upvote provider1-post-comment-reply*////////////////////////////////////
    //upvote provider1
    ob.upvote = function(provider) {
        return $http.put('/api/providers/' + provider._id + '/upvote',null, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(data){
              if(data === "Upvote"){//if response is upvote we should increese vote count by 1
                provider.upvotes += 1;
              }else if(data === "Downvote"){
                provider.upvotes -= 1;
              }
            });
    };

    //upvote post
    ob.upvotePost = function(provider, post) {
        /*console.log("Calling upvotePost function on providerFactory.js")
         console.log("PROVIDER -> ", provider)
         console.log("POST -> ", post)*/

        return $http.put('/api/providers/' + provider._id + '/posts/'+ post._id + '/upvote',null, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(data){
              if(data === "Upvote"){//if response is upvote we should increese vote count by 1
                post.upvotes += 1;
              }else if(data === "Downvote"){
                post.upvotes -= 1;
              }
            });
    };

    //upvote comment
    ob.upvoteComment = function(provider,post,comment) {
        //console.log("Calling upvoteComment function on providerFactory.js")
        //console.log("PROVIDER -> ", provider)
        //console.log("POST -> ", post)
        //console.log("COMMENT -> ", comment
        return $http.put('/api/providers/' + provider + '/posts/'+ post._id +  '/comments/' + comment._id + '/upvote',null, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(data){
              if(data === "Upvote"){//if response is upvote we should increese vote count by 1
                comment.upvotes += 1;
              }else if(data === "Downvote"){
                comment.upvotes -= 1;
              }
            });
    };

       //upvote reply
    ob.upvoteReply = function(provider, post,comment,reply) {
        //console.log("Calling upvoteReply function on providerFactory.js")
        // console.log("PROVIDER -> ", providerId)
        // console.log("POST -> ", postId)
        //console.log("COMMENT -> ", commentId)
        //console.log("REPLY -> ", reply)

        return $http.put('/api/providers/' + provider + '/posts/'+ post +  '/comments/' + comment._id + '/replies/' + reply._id + '/upvote',null,{
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(data){
                if(data === "Upvote"){//if response is upvote we should increese vote count by 1
                  reply.upvotes += 1;
                }else if(data === "Downvote"){
                  reply.upvotes -= 1;
                }
        });
    };

//////////////////////////////////////// /*delete provider1 - post-comment method*////////////////////////////////////////////
    /*delete one provider*/
    ob.deleteProvider = function (providerId) {
        return $http.delete('/api/providers/' + providerId, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        })
    };

    /*delete one post*/
    ob.deletePost = function (providerId,postId) {

        return $http.delete('/api/providers/' + providerId +'/posts/' + postId ,{
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        });
    };

    /*delete one comment*/
    ob.deleteComment = function (providerId,postId,commentId) {
        return $http.delete('/api/providers/' + providerId +'/posts/' + postId + '/comments/' + commentId, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        });
    };

    /*delete one reply*/
    ob.deleteReply = function (providerId,postId,commentId,replyId) {
        return $http.delete('/api/providers/' + providerId +'/posts/' + postId + '/comments/' + commentId +'/replies/' + replyId, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        });
    };

//////////////////////////////////////// /*update provider1 - post-comment method*////////////////////////////////////////////

    /*update one provider1*/
    ob.updateProvider = function (provider) {
        //console.log("Calling upvoteReply function on providerFactory.js")
        // console.log("PROVIDER -> ", provider1)
        return $http.put('/api/providers/' + provider._id , provider, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
            }).success(function(provider){
             // ob.providers.push(provider);
               // angular.copy(provider1, ob.providers);
            })
    };

    /*update one post*/
    ob.updatePost = function (provider,post) {
        //console.log("Calling Reply function on postFactory.js")
        //console.log("POST -> ", post)
       // providerId= post.provider;
      //  console.log('CALL FUNC FROM provider factory,update post',providerId);
        return $http.put('/api/providers/' + provider._id + '/posts/'+ post._id , post, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(post){
                /*//console.log(post);
                console.log('PROVIDER from factory:',provider1);
                console.log('POSTS from factory:',posts);
                ob.provider1.posts.push(post);
                // angular.copy(provider1, ob.providers);*/
            })
    };

    /*update one comment*/
    ob.updateComment = function (provider,post,comment) {
      var postId = comment.post;

        return $http.put('/api/providers/' + provider + '/posts/'+ post._id +  '/comments/' + comment._id , comment, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(comment){

            })
    };

    /*update one reply*/
    ob.updateReply = function (provider,post,comment,reply) {

        return $http.put('/api/providers/' + provider + '/posts/'+ post +  '/comments/' + comment + '/replies/' + reply._id, reply, {
            headers: {Authorization: 'Bearer '+Auth.getToken()}
        }).success(function(reply){

        })
    };

    return ob;
}]);



