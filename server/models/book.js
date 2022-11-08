//models/book.js = book model

let mongoose  = require('mongoose'); //To get access to the mongoose clases

//Create a model class
let bookModel = mongoose.Schema({
    //Properties/structure of the DB
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
},
{
    collection: "books" //Like a table in the database (db.books.find())
});

//Returns a whole model, not just a class - this means all of the mongo commands (e.g., insert, find, remove) come from bookModel
module.exports = mongoose.model('Book', bookModel);