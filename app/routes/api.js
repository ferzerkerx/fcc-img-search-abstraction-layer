'use strict';

var path = process.cwd();
var ImageSearchService = require(path + '/app/services/ImageSearchService.js');


module.exports = function (app) {
    var imageSearchService = new ImageSearchService();

    app.route('/api/imageSearch/:query').get(imageSearchService.searchQuery);

    app.route('/api/latest/imagesearch/').get(imageSearchService.searchHistory);

};