const express = require('express');
const fs = require('fs');
const app = express();
const csvfilePath = './log.csv';
const csv = require('csvtojson');

app.use((req, res, next) => {
// write your logging code here
    let agent = req.headers['user-agent'].replace(",", '');
    let time = new Date();
    let method = req.method;
    let resource = req.path;
    let version = `HTTP/${req.httpVersion}`;
    let status = res.statusCode;

    let logger = `${agent},${time.toISOString()},${method},${resource},${version},${status}\n`
    console.log(logger);

    fs.appendFile('log.csv', logger, err => {
        if (err) throw err 
          console.log(err);
        
      });
      next();

});

app.get('/', (req, res) => {
// write your code to respond "ok" here
    res.status(200).send('ok');
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
    csv()
        .fromFile(csvfilePath)
        .then((jsonObj) => {
            res.send(jsonObj);
        })
    
});

module.exports = app;
