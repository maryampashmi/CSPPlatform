// Retrieve
var MongoClient = require('mongodb').MongoClient;

var db;   // actual connection to mongodb
var certificates = new Array;
var controllers = new Array;   

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/cspmetadata-dev", function(err, dbval) { 
    if(!err) {
        console.log("We are connected");
        db = dbval;   // any function can use db
        queryCertificates();
    }
});

/**This method is used to create array of certificates
 * after the successfull execution we are calling queryControllers to create list of controllers
 */
function queryCertificates(){

    var collection = db.collection('certificates');   //only collection to database.

    var stream = collection.find().stream(); //{name:""} //we need to execute query , we can query also that. to get stearm of document.

    //collection.find().toArray(function(err, items) {});  
    stream.on("data", function(item) {certificates.push(item);}); //every thing is pushing of one record. 
    stream.on("end", function() {queryControllers();});  //when stream finished.


}

/**This method is used to create array of controllers
 * after the successfull execution we are calling processCertificates to do the business logic
 */
function queryControllers(){

    var collection = db.collection('certcontrollers');

    var stream = collection.find().stream(); //{mykey:{$ne:2}}

    //collection.find().toArray(function(err, items) {});   
    stream.on("data", function(item) {controllers.push(item);});
    stream.on("end", function() {processCertificates()});


}



function processCertificates(){
    console.log(controllers.length);
    certificates.forEach(function(certificate){
        controllers.forEach(function(controller){
           // console.log(certificate.name+" : " +controller.parent+" : "+controller.parent.indexOf(certificate.name));
            if(controller.parent.indexOf(certificate.name)>-1){//check if the controller parent have certificate name //if it is exist.
                if(certificate.certControllers.indexOf(controller._id)<0){//check certificate do not have the same controller
                    certificate.certControllers.push(controller._id);   // -1 (not exist)
                }
            }
        });
       // console.log(certificate.name +" " +certificate.certControllers);
        var collection = db.collection('certificates');
        //update the certifiacte controller value with the new one
        collection.update({_id:certificate._id},{$set:{certControllers:certificate.certControllers}} );
    });

}
