/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

//This application uses express as its web server
//for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

/** *ここから追加** */
// POSTパラメータ取得用 body-parser設定 (express4から必要)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Date()で現在時刻を取得するためのユーティリティ
var dateutil = require('date-utils');

app.post('/', function(req, res){
var date = new Date();
var now = date.toFormat("YYYY/MM/DD HH24:MI:SS");
req.body.date = now;

console.log('app.js req.body: ' + JSON.stringify(req.body));
res.send(req.body);
});
/** *ここまで追加** */

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

// print a message when the server starts listening
console.log("server starting on " + appEnv.url);
});