'use strict';

var request = require('request');

function ImageSearchService() {


    this.search = function (req, res) {

        var query = req.params.query;
        var cx = process.env.GOOGLE_CX;
        var key = process.env.GOOGLE_API_KEY;

        var options = {
            host: 'googleapis.com',
            port: 443,
            method: 'GET',
            path: '/customsearch/v1?searchType=image&cx=' +  cx +'&key=' + key +'&q=' + query
        };

        console.log(JSON.stringify(options));

        var qs = {cx: cx,
        key: key,
        q: query};
        var name = {url:'https://www.googleapis.com:443/customsearch/v1', qs: qs, json:true};
        request.get(name, function (e, r) {
            console.log('e:' +  JSON.stringify(e));
            console.log('r:' +  JSON.stringify(r));

            //var images = [{
            //    "url": "http://cdnstatic.visualizeus.com/thumbs/36/0b/funny,lolcat,cats,cat,lolcats,humor-360ba427d350494fb4e69b209a93a814_h.jpg",
            //    "snippet": "funny-pictures-cat-breaks-",
            //    "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT3LYyfkNxQWcG6wmB6M2FgUZpMXbjxXhc-g4CJ18luXAvDBdBNrzXAZQ8",
            //    "context": "http://vi.sualize.us/icanhascheezburger_files_wordpress_2008_06_funny_pictures_hug_moment_forever_love_lolcats_picture_n2v.html"
            //}];

            return res.json(r.body.items);

        })

    };

}

module.exports = ImageSearchService;