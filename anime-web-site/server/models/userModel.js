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
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User',userSchema);