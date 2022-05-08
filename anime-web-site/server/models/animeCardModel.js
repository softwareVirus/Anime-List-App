const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    image: {
        type: {
            src: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                required: true
            }
        },
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    point: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('animeCard',userSchema);