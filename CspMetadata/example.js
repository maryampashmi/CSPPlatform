
var list1 = require("./list1.js").list1
var list2 = require("./list2.js").list2


//console.log("LIST1 length: ", list1.length)
//console.log("LIST2 length: ", list2.length)

var combineLists = function(list1, list2){
  var temporalList = [];

  var searchingName = "";

  //Loop on the first
  list1.forEach(function(element1){
   // console.log("E1: ",element1.name)
    searchingName = element1.name.replace(/ /g,'');

    list2.forEach(function(element2){
      //For each element, search its name in the second list
      // console.log("E1: ",element1.name,"E2: ",element2.certControllers)// ,"E2.certsubcontrollers: ", element2.certSubControllers)
      //  console.log("ELEMENT 2: " + JSON.stringify(element2.certControllers))

        if (element2.certSubControllers !== undefined) {
          element2.certSubControllers.forEach(function(child2){
            child2.name = child2.name.replace(/ /g,'');
            if(searchingName == child2.name){
              child2["$oid"] = element1["_id"]["$oid"];

            }
          })
        }



    })

  })
  list1.forEach(function(element1) {
    list2.forEach(function (element2) {
      if (element2.certSubControllers !== undefined) {
        element2.certSubControllers.forEach(function (child2) {
          delete child2["name"];
        });
      }
    });
  });
  return JSON.stringify(list2);
}

/*
 if(list1.length > list2.length){
 //If list1 is longer than list2

 //Combine lists
 combineLists(list2, list1);



 //Store the result in a file
 }else{
 //If both lists have the same number of elements
 //or list2 is bigger
 combineLists(list1, list2);

 //Combine lists

 //Store the result in a file


 }

 */

console.log("RESULT: ",combineLists(list1, list2));
