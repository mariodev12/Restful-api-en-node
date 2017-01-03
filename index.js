const express = require('express');
const app = express();
const request = require('request');
const async = require('async');

app.get('/upcoming', (req, res) => {
    async.times(2, (i, callback) => {
    var options = {
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=API_KEY',
        qs: {
            'language': 'en-US',
            'page': i+1,
            'region': 'us'
        },
    } 
    request(options, (error, response, body) => {
        var result = JSON.parse(body)
        var data = result.results;
        callback(null, data);
    });
    }, (err, results) => {
        res.json(results);
    });
})

app.listen('8010', () => {
    console.log('Listening on port 8010');
})
