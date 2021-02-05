const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// definindo model - book

const Book = new Schema({
    id: {
        type: String,
        required: true
    },
    selfLink: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    description: {
        type: String,
    },
    previewLink: {
        type: String,
        default: "#"
    },
    authors: {
        type: Array,
        required: true
    },
    etag: {
        type: String,
        required: true
    }


},
{
    timestamps: true
})


mongoose.model('books', Book)