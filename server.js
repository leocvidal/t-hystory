var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')

//Authentication to be added here

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var mydb;

/* Endpoint to return An array of all HLS transactions.
* Send a GET request to localhost:7000/api/hls  */

app.get("/api/hls", function (request, response) {
      if(!mydb) {
        console.log("No database.");
        response.send("No database");
        return;
      }

    var selector =
      {
      "selector": {
        "Type": 'HLS'
      },
      "fields": ["Loan_Number", "Account_type", "Tran_Date", "Process_Date","Sequence_Number","Amount","Tran_Type",
      "Branch_Number","Description","Description_Line","Run_Balance"],
      "skip": 0
    };

    mydb.find(selector, function(err, result) {
      if (err) {
        throw err;
      } else {
              response.json(result.docs);
              return (result.docs);
            }
      });
});


/* Endpoint to return An array of all CPS transactions.
* Send a GET request to localhost:7000/api/hls  */

app.get("/api/cps", function (request, response) {
      if(!mydb) {
        console.log("No database.");
        response.send("No database");
        return;
      }

      var selector =
        {
        "selector": {
          "Type": 'CPS'
        },
        "fields": ["Account_Number", "Tran_Date", "Post_date", "Sequence_Number","Amount","Tran_Code",
        "Reason_Code","Reference_Number","Description_Line"],
        "skip": 0
      };

    mydb.find(selector, function(err, result) {
      if (err) {
        throw er;
      } else {

              response.json(result.docs);
              return (result.docs);
            }
      });
});

/**
 * <code>
 * GET http://localhost:7000/api/account?Loan_Number=283140037
 * @return account details
 */
// "Search Loan_Number": "283140037"
app.get("/api/loan", function (request, response) {
      if(!mydb) {
        response.json("No DB defined.");
        return console.log('No DB defined');
      }

    var loan_id = request.query;

    var query = { selector: request.query};

    console.log(query);
    //return console.log(query);
    mydb.find(query, function(err, data) {
      if (err) {
        response.json(err.message);
        return console.log('Error: ', err.message);
      }

      jsonStringx = JSON.stringify( data );

      if (jsonStringx.toString().trim() === '{"docs":[]}') {  // @@ Not found in DB
        response.json("Not found");
        return console.log('Not found.');

      }else {   // @@ Not indexed
              if (jsonStringx.toString().trim() === '{"warning":"no matching index found, create an index to optimize query time","docs":[]}') {
                response.json("Account not found (DB not indexed)");
                return console.log('Account not found (DB not indexed)');
              } else {    // @@ Found in DB
              response.json(data.docs);   // @@ return _ID for given name
              //   response.json(data.docs[0].Reference_Number);   // @@ return _ID for given name
                  return console.log(request.query," found.");
            }
      }

    });

});

/* / "Search Loan Number": "620976518"
Content-Type: application/json
{
 	"Loan_Number": "620976518"
}
*/

app.post("/api/loan", function (request, response) {

      if(!mydb) {
        response.json("No DB defined.");
        return console.log('No DB defined');
      }

    var query = { selector: { 'Loan_Number': request.body.Loan_Number }};

    mydb.find(query, function(err, data) {
      if (err) {
        response.json(err.message);
        return console.log('Error: ', err.message);
      }

      jsonStringx = JSON.stringify( data );

      if (jsonStringx.toString().trim() === '{"docs":[]}') {  // @@ Not found in DB
        response.json("Not found");
        return console.log('Not found.');

      }else {   // @@ Not indexed
              if (jsonStringx.toString().trim() === '{"warning":"no matching index found, create an index to optimize query time","docs":[]}') {
                response.json("Account not found (DB not indexed)");
                return console.log('Account not found (DB not indexed)');
              } else {    // @@ Found in DB
                response.json(data.docs);   // @@ return _ID for given name
                //   response.json(data.docs[0].Reference_Number);   // @@ return _ID for given name
                  return console.log(request.body.Loan_Number," found.");
              }
      }

    });

});


/**
 * <code>
 * GET http://localhost:7000/api/account?Account_Number=4015190848549214
 * @return account details
 */
// "Search Account Number": "4065190278549210"
app.get("/api/account", function (request, response) {
      if(!mydb) {
        response.json("No DB defined.");
        return console.log('No DB defined');
      }

      var account_id = request.query;

    var query = { selector: request.query};

    // response.send(query);
    // return console.log(query);
    mydb.find(query, function(err, data) {
      if (err) {
        response.json(err.message);
        return console.log('Error: ', err.message);
      }

      jsonStringx = JSON.stringify( data );

      if (jsonStringx.toString().trim() === '{"docs":[]}') {  // @@ Not found in DB
        response.json("Not found");
        return console.log('Not found.');

      }else {   // @@ Not indexed
              if (jsonStringx.toString().trim() === '{"warning":"no matching index found, create an index to optimize query time","docs":[]}') {
                response.json("Account not found (DB not indexed)");
                return console.log('Account not found (DB not indexed)');
              } else {    // @@ Found in DB
              response.json(data.docs);   // @@ return _ID for given name
              //   response.json(data.docs[0].Reference_Number);   // @@ return _ID for given name
                  return console.log(request.query," found.");
            }
      }

});

});

/* / "Search Account Number": "4065190278549210"
Content-Type: application/json
{
 	"Account_Number": "4065190278549210"
}
*/

app.post("/api/account", function (request, response) {

      if(!mydb) {
        response.json("No DB defined.");
        return console.log('No DB defined');
      }

    var query = { selector: { 'Account_Number': request.body.Account_Number }};

    mydb.find(query, function(err, data) {
      if (err) {
        response.json(err.message);
        return console.log('Error: ', err.message);
      }

      jsonStringx = JSON.stringify( data );

      if (jsonStringx.toString().trim() === '{"docs":[]}') {  // @@ Not found in DB
        response.json("Not found");
        return console.log('Not found.');

      }else {   // @@ Not indexed
              if (jsonStringx.toString().trim() === '{"warning":"no matching index found, create an index to optimize query time","docs":[]}') {
                response.json("Account not found (DB not indexed)");
                return console.log('Account not found (DB not indexed)');
              } else {    // @@ Found in DB
                response.json(data.docs);   // @@ return _ID for given name
                //   response.json(data.docs[0].Reference_Number);   // @@ return _ID for given name
                  return console.log(request.body.Account_Number," found.");
              }
      }

    });

});

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./config/vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}
const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB']) {
    // Load the Cloudant library.
    var Cloudant = require('cloudant');

    // Initialize database with credentials
    var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);

    //database name
    var dbName = 'cbadb';

    // Create a new "mydb" database.
    cloudant.db.create(dbName, function(err, data) {
      if(!err) //err if database doesn't already exists
        console.log("Created database: " + dbName);
    });

    // Specify the database we are going to use (mydb)...
    mydb = cloudant.db.use(dbName);
}

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));


var port = process.env.PORT || 8080
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
