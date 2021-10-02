const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const link = new Schema({
    url: {type: String},
    shortcode: {type: String},
    visits: {type: Number}
});

module.exports = mongoose.model('links', link)