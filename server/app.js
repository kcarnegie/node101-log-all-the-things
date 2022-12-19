const express = require('express');
const fs = require('fs');
const app = express();

var entries = ["Agent","Time","Method","Resource","Version","Status"];
fs.writeFile("server/log.csv",entries.join(",") + "\n", function(err) {
    if (err) console.log("Error Creating log file: "+err);
    });

app.use((req, res, next) => {

    var newResult = [];
    newResult.push(req.header("user-agent"));
    newResult.push((new Date()).toISOString());
    newResult.push(req.method);
    newResult.push(req.path);
    newResult.push("HTTP/"+req.httpVersion);
    newResult.push(200) 
    console.log(newResult.join(","));

    fs.appendFile("server/log.csv",newResult.join(",")+"\n", function(err) {
        if (err) console.log("Error writing log file: "+err);
        });

    next();
});

app.get('/', (req, res) => {
    res.send("ok").end();
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
    var file = fs.readFile("server/log.csv",function(err, data) {
        var result = [];
        var textLines = data.toString().split("\n");
        var fields = textLines[0].split(",");
        for (var i = 1; i < textLines.length-1; i++) {
            var entry = {};
            fields.forEach(function(el,idx) {
                entry[el] = textLines[i].split(",")[idx];
            });
            result.push(entry);
        }
        res.send(result).end();
    });
});

module.exports = app;

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here

});

module.exports = app;
