'use strict';

var request = require('request');

var path = process.cwd();
var SearchEvent = require(path + '/app/models/SearchEvent.js');

function ImageSearchService() {


    this.searchQuery = function (req, res) {

        var query = req.params.query;
        var cx = process.env.GOOGLE_CX;
        var key = process.env.GOOGLE_API_KEY;

        var offset = req.query.offset;
        var resultsPerPage = 10;

        var qs = {
            cx: cx,
            key: key,
            q: query,
            num: resultsPerPage
        };
        if (offset && offset > 0) {
            qs.start = offset*resultsPerPage + 1;
        }
        console.log('###:' + JSON.stringify(qs));

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