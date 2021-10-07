const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const link = new Schema({
    url: {type: String},
    visits: {type: Number},
    shortcode: {type: String}
});

module.exports = mongoose.model('links', link)