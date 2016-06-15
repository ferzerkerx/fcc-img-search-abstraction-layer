'use strict';

var request = require('request');

var path = process.cwd();
var SearchEvent = require(path + '/app/models/SearchEvent.js');

function ImageSearchService() {


    this.searchQuery = function (req, res) {

        var query = req.params.query;
        var cx = process.env.GOOGLE_CX;
        var key = process.env.GOOGLE_API_KEY;

        var options = {
            host: 'googleapis.com',
            port: 443,
            method: 'GET',
            path: '/customsearch/v1?searchType=image&cx=' + cx + '&key=' + key + '&q=' + query
        };

        console.log(JSON.stringify(options));

        var qs = {
            cx: cx,
            key: key,
            q: query
        };
        var name = {url: 'https://www.googleapis.com:443/customsearch/v1', qs: qs, json: true};
        request.get(name, function (e, r) {
            console.log('e:' + JSON.stringify(e));
            console.log('r:' + JSON.stringify(r));

            var images = [];
            var items = r.body.items;
            if(items) {
                images = items.map(function(e) {
                    console.log(JSON.stringify(e));
                    var thumbnail = e.pagemap.cse_thumbnail;
                    if (!thumbnail) {
                        thumbnail = e.pagemap.imageobject.url;
                    }
                   return {
                       url: e.url,
                       snippet: e.snippet,
                       thumbnail: thumbnail,
                       context: e.link
                   }
                });
            }

            return res.json(images);
        });

        var searchEvent = new SearchEvent({
            term: query,
            when: Date.now()
        });
        searchEvent.save(function (err, searchEvent) {
            if (err) {
                console.log(err + ', searchEvent:' + JSON.stringify(searchEvent));
            }
        });
    };


    this.searchHistory =  function(req, res) {
        var query = SearchEvent.find().limit(20);
        query.exec(function(err, searchEvents) {
            if (err) {
                return res.json(500, {
                    message: 'Error',
                    error: err
                });
            }
            var filteredSearchEvents = searchEvents.map(function(e) {
                return {term: e.term, when: e.when};
            });
            return res.json(filteredSearchEvents);
        });
    };
}

module.exports = ImageSearchService;