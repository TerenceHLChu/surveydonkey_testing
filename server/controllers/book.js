let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

//Create a reference to the model
let Book = require('../models/book');

module.exports.displayBookList = (req,res,next) => { //Look at the top level route
    Book.find((err, bookList) => { //When request is received, send a response
        //If there is an error, return BookList
        if(err)
        {
            return console.error(err); //Generate an error on the server side
        }
        else
        {
            // console.log(bookList);
            //response render
            //'book/list' is the view. {} is the object being pushed to the view
            res.render('book/list', 
            {title: 'Books', 
            BookList: bookList,
            displayName: req.user ? req.user.displayName: ''}); //Pass bookList object into the BookList property
        }
    });
};

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', {title: 'Add Book',
    displayName: req.user ? req.user.displayName: ''})
}

module.exports.processAddPage = (req, res, next) => {
    //Create newBook object
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create(newBook, (err, Book) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //Refresh the book list
            res.redirect('/book-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            //Show the edit view
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit,
            displayName: req.user ? req.user.displayName: ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedBook = Book({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    //Search for _id
    Book.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //Refresh the book list
            res.redirect('/book-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //Refresh the book list
            res.redirect('/book-list');
        }
    });
}