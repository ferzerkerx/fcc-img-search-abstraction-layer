'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchEvent = new Schema({
    term: String,
    when: Date
});


module.exports = mongoose.model('SearchEvent', SearchEvent);