const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// definindo model - book

const Book = new Schema({
    data: {
        //tipos : String | Number | Date | Object
        type: Object,
        require: true
    }
},
{
    timestamps: true
})


mongoose.model('books', Book)