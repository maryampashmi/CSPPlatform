
var http = require("http");

var Provider = require('../provider/provider.controller');
var providerObject = require('../provider/provider.model');


/**
 * This method is callback for first query (query to get list of companies)
 * after it recived the response thie method will call processResultJson
 * to get detailed information of each company
 * @param res*/



onJsonResponse = function(res) {
  var data = '';

  res.on('data', function (chunk){
    data += chunk;
  });

  res.on('end',function(){
    var jsonStr = JSON.parse(data);
    //console.log(JSON.stringify(jsonStr.head));
    processResultJson(jsonStr);
  })
}
//query to get list of companies
//Change the query part to modify the list of companies
var queryCompanies = "http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&"+
  "query=select+distinct(%3Fcompany)+where%0D%0A{{%0D%0A%09{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_storage%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_applications%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_infrastructure%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3ACloud_platforms%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3AFree_software_for_cloud_computing%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3AInfrastructure_as_a_service%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany++dcterms%3Asubject+category%3AWeb_hosting%0D%0A%09}%0D%0A%09union{%0D%0A%09%3Fcompany+dcterms%3Asubject+category%3ACloud_infrastructure%0D%0A%09}%0D%0A%09.%0D%0A%09%3Fcompany+dcterms%3Asubject+category%3ACloud_computing_providers.%0D%0A%09}union{%0D%0A%09%09%3Fcompany+dbpedia-owl%3AwikiPageID+32476167%0D%0A%09}union{%0D%0A%09%09%3Fcompany+dbpedia-owl%3AwikiPageID+19127434%0D%0A%09}union{%0D%0A%09%09%3Fcompany+dbpedia-owl%3AwikiPageID+37259190%0D%0A%09}%0D%0A%0D%0Aunion{%0D%0A++%3Fcompany+dbpedia-owl%3AwikiPageID+29621629+%0D%0A+}%0D%0Aunion{%0D%0A++%3Fcompany+dbpedia-owl%3AwikiPageID+40379651%0D%0A+}%0D%0Aunion{%0D%0A++%3Fcompany+dbpedia-owl%3AwikiPageID+19961416%0D%0A+}%0D%0Aunion{%0D%0A++%3Fcompany+dbpedia-owl%3AwikiPageID+42411494%0D%0A+}%0D%0Aunion{%0D%0A++%3Fcompany+dbpedia-owl%3AwikiPageID+41992914%0D%0A+}%0D%0Aunion{%0D%0A++%3Fcompany+dbpedia-owl%3AwikiPageID+33417844%0D%0A+}%0D%0Aunion{%0D%0A++%3Fcompany+dbpedia-owl%3AwikiPageID+1092923%0D%0A+}%0D%0Aunion{%0D%0A++%3Fcompany+dbpedia-owl%3AwikiPageID+19001%0D%0A+}%0D%0A%0D%0A}"

  +"&format=application%2Fsparql-results%2Bjson";

//query to get details of companies
//
var queryDetail = "http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&" +

  "query=PREFIX+owl%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0D%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0D%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0D%0APREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0D%0APREFIX+%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0D%0APREFIX+dbpedia2%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2F%3E%0D%0APREFIX+dbpedia%3A+%3Chttp%3A%2F%2Fdbpedia.org%2F%3E%0D%0APREFIX+skos%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0D%0Aselect+%3Fcompany+%3Fcompany_name+%3Fhomepage+%3FproductLabel+%3FlocationLabel+%3Fthumbnail+%3Fabstract%0D%0Awhere%7B%0D%0A+BIND+%28+%3CCOMAPNYQRYTAG%3E+AS+%3Fcompany%29%0D%0A+%0D%0Aoptional%7B%0D%0A++++%3Fcompany+foaf%3Aname+%3Fcompany_name%0D%0A+%7D%0D%0Aoptional%7B%0D%0A++++%3Fcompany+rdfs%3Alabel+%3Fcompany_name%0D%0A+%7D%0D%0A%0D%0Aoptional%7B%0D%0A++++%3Fcompany+foaf%3Ahomepage+%3Fhomepage.%0D%0A%7D%0D%0A%0D%0AOptional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Aproduct+%3Fproduct.%0D%0A++++++++%3Fproduct+rdfs%3Alabel+%3FproductLabel+.%0D%0A%7D%0D%0Aoptional%7B%0D%0A++++%3Fcompany+foaf%3Aname+%3FproductLabel%0D%0A+%7D%0D%0Aoptional%7B%0D%0A++++%3Fcompany+rdfs%3Alabel+%3FproductLabel%0D%0A+%7D%0D%0AOptional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Alocation+%3Flocation.%0D%0A++++++++%3Flocation+rdfs%3Alabel+%3FlocationLabel+.%0D%0A%7D%0D%0AOptional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3AlocationCity+%3Flocation.%0D%0A++++++++%3Flocation+rdfs%3Alabel+%3FlocationLabel+.%0D%0A+FILTER+%28langMatches%28lang%28%3FlocationLabel%29%2C%22en%22%29%29+%7D%0D%0AOptional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Athumbnail+%3Fthumbnail.%0D%0A%7D%0D%0A%0D%0AOptional+%7B%0D%0A++++++++%3Fcompany+dbpedia-owl%3Aabstract+%3Fabstract.%0D%0A%7D%0D%0A%0D%0A%0D%0AFILTER+%28langMatches%28lang%28%3Fabstract%29%2C%22en%22%29%29%0D%0AFILTER+%28langMatches%28lang%28%3FproductLabel%29%2C%22en%22%29%29%0D%0AFILTER+%28langMatches%28lang%28%3FlocationLabel%29%2C%22en%22%29%29++%0D%0A%7D%0D%0A" +

  "&output=json";


/**
 * This method got called after the insertion of data into mongodb or exception
 * Here we are printing the error or success message to original http response
 * @param code
 * @param provider
 */

handleMongoInsertResponse = function(code, provider) {
  count++;
  if (code == "Error") {
    resp.write("Exception on saving " + JSON.stringify(provider) + "\n");
  }else if(code=="Duplicate"){
    resp.write("Duplicate " + provider.name + "\n");
  }else{
    resp.write("Inserted " +provider.name + "\n");
  }
  if(companies.length==count){
    console.log('inserted all data into db');
   // resp.end(); //some issues comeing because of response closing
  }
}

var companyGroup = ["Amazon","IBM","Microsoft","Yahoo","Rackspace","Google","Adobe","FUJITSU"];
var fkrequest= JSON.parse("{}");
var fkresponse = JSON.parse("{}");
var resp ;
var companies;
var count;

fkresponse.json = handleMongoInsertResponse;



/**
 * This method is used for inserting all the records from dbpedia to mongodb
 * It is called from wiki controller
 * @param req
 * @param res*/


exports.bulkInsert= function(req, res){
  count = 0;
  resp= res;
  http.get(queryCompanies,onJsonResponse);
}



/**This method is callback after executing second query
 * It will get all the details on end method and call processDetailJson for inserting it into mongodb
 *
 * @param res*/


onJsonDetailResponse = function(res) {
  var data = '';

  res.on('data', function (chunk){
    data += chunk;
  });

  res.on('end',function(){
    //console.log(data);
    try{
      var jsonStr = JSON.parse(data);
      processDetailJson(jsonStr);
    }catch(e){
      console.error("error while parsing data response from dbpedia.. most likely the site is down");
      console.error(data);
    }

  })
}



/**
 * This method is called after list of companies
 * for each companies its executing the second query to get more details needed to be saved
 * @param response*/


processResultJson =  function(response){
  //console.log(response.results.bindings);
  companies = response.results.bindings;
  companies.forEach(function(companyRow){
    var companyURI = companyRow.company.value;
    var qry = queryDetail.replace("COMAPNYQRYTAG", companyURI);
    executeQuery(qry,companyRow);
    console.log("getting details for" +companyURI);
    var sleep = require('sleep');
    sleep.sleep(1)//sleep for 1 seconds
  })

}

function executeQuery(qry,companyRow){

  http.get(qry,onJsonDetailResponse).on('error', function(e) {
    console.log("Timeout while doing " + companyRow.company.value);
    console.log("Retrying the above company");
    executeQuery(qry,companyRow);
   //console.log(e);
   // //handleMongoInsertResponse("Error",companyRow);
  });
}

/**This method is making inserting the details recived from second query to mongodb
 * Using Provider.create to insert data to mongo
 *
 * @param response*/


processDetailJson =  function(response){
  try{
    //response from dbpedia - it have the structure results > binings[]
    var row =response.results.bindings[0];
    //console.log(JSON.stringify(row));
    var newRow = {};
    if(row.company_name ===undefined){
      //if there is no name for a comapny its probably invalid company
      handleMongoInsertResponse("Error",row);
      return;
    }
    newRow.company = row.company.value;
    newRow.name = row.company_name.value;
    if(row.homepage !==undefined){
      newRow.url = row.homepage.value;
    }
    if(row.abstract !==undefined){
      newRow.description = row.abstract.value;
    }

    /*
     Insert new property in this part...*/

    var locationArr = new Array;
    var productLabelArr = new Array;
    if(row.locationLabel !==undefined){
      locationArr.push(row.locationLabel.value);
    }
    if(row.productLabel!==undefined){
      productLabelArr.push(row.productLabel.value);
    }
    newRow.locations = locationArr;
    newRow.services = productLabelArr;

    fkrequest.body = newRow;
    //Checking the company group
    var group = checkInCompanyGroup(newRow.company);
    if(group !== null){
      insertIntoGroup(group,row);
    }else{
      //checking for duplicate record.
      var provider = new providerObject({ name: newRow.name });
      provider.findByName(function (err, providers) {
        if(providers.length==0){
          //insert provider
          var frequest=JSON.parse("{}");
          frequest.body = newRow;
          Provider.create(frequest,fkresponse)
        }else{
          //its a duplicate
          handleMongoInsertResponse("Duplicate",newRow);
        }
      });
    }

  }catch(e){
    console.error("error while processing company details");
    console.log(e);
    handleMongoInsertResponse("Error",response);
  }

}




/**This method insert into company group
 **/


function insertIntoGroup(group,row) {

  if (synchronizer === false) {
    setTimeout(function () {
      insertIntoGroup(group, row);
    }, 1000);
  }
  synchronizedInsertIntoGroup(group, row);
}

var synchronizer = true;//execute the synchronized method only if the synchronizer is true




/**
 * This is a synchronized function
 * Only one thread can execute this function at a time
 * This will prevent this method getting executed before the previous thread completing insertion
 *
 * @param group
 * @param row*/


function synchronizedInsertIntoGroup(group,row){
  synchronizer = false;
  var provider = new providerObject({ name: group });
  provider.findByName(function (err, providers) {
    var provider;
    if(providers.length==0){  //in case of amazon it is not in the list
      //insert new row
      var newRow = {};
      newRow.company = group;
      newRow.name    = group;
      newRow.locations = new Array;
      newRow.services = new Array;
      if(row.locationLabel !==undefined){
        newRow.locations.push(row.locationLabel.value);
      }
      if(row.productLabel!==undefined) {
        /*escaping list of in some products*/
        if (row.productLabel.value.indexOf("List of") < 0) {
          newRow.services.push(row.productLabel.value);
        }
      }
      if(row.abstract !==undefined){
        if(newRow.description  ===undefined){
          newRow.description = row.abstract.value;
        }else{
          newRow.description = newRow.description + " \n " +row.abstract.value;
        }
      }

      if(row.homepage !==undefined){
        if(newRow.url  ===undefined){
          newRow.url = row.homepage.value;
          //}else{
          //  newRow.url =  newRow.url +","+ row.homepage.value;
        }
      }
      //fresponse is for getting the result after inserting amazon
      var frequest=JSON.parse("{}");
      frequest.body = newRow;
      var fresponse = JSON.parse("{}");
      fresponse.json = function(code,resp){
        synchronizer = true;
        handleMongoInsertResponse(code,resp);}
      Provider.create(frequest,fresponse);//insert amamzon
    }else {
      synchronizer = true;
      //update the rows
      provider = providers[0];
      //console.log(JSON.stringify(row));
      if(row.locationLabel !==undefined){
        if(!checkInArray(provider.locations,row.locationLabel.value))
          provider.locations.push(row.locationLabel.value);
      }
      if(row.productLabel!==undefined){
        if(!checkInArray(provider.services,row.productLabel.value)){
          /*escaping list of in some products*/
          if(row.productLabel.value.indexOf("List of")<0){
          provider.services.push(row.productLabel.value);
        }
        }
      }
      if(row.abstract !==undefined){
        if(provider.description  ===undefined){
          provider.description = row.abstract.value;
        }else if(provider.description.indexOf(row.abstract.value)<0){
          provider.description = provider.description + " \n " +row.abstract.value;
        }
      }

      if(row.homepage !==undefined){
        if(provider.url  ===undefined){
          provider.url = row.homepage.value;
        }
	/*else if(provider.url.indexOf(row.homepage.value)<0){//if the url not exitsts already insert the homepage also
          provider.url =  provider.url +","+ row.homepage.value;
        }*/
      }

      provider.save(function (err) {
        if (err) {
          return handleError(res, err);
        }
        handleMongoInsertResponse("Duplicate",provider);
      });
    }

  });
}

function checkInArray(categories,check){
  var found = false;
  for (i = 0; i < categories.length && !found; i++) {
    if (categories[i] === check) {
      found = true;
    }
  }
  return found;
}



function checkInCompanyGroup(company){
  var tmp = company.split("/");
  var returnval = null;
  var companyVar = tmp[tmp.length-1];
  companyGroup.forEach(function(val){
    if(companyVar.indexOf(val)===0){
      returnval = val;
      return;
    }
  })
  return returnval;
}

