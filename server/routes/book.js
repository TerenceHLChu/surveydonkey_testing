//routes/book.js = book routes

//express is used for all routing
let express = require('express');
const { removeData } = require('jquery');
let router = express.Router(); //A router object
let mongoose = require('mongoose'); //So that we can use mongoose commands

let jwt = require('jsonwebtoken');

let passport = require('passport');

let bookController = require('../controllers/book');

//Helper function for guard purposes
function requireAuth(req, res, next)
{
    //Check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//GET Route for the Book List page - this is the READ Operation
router.get('/', bookController.displayBookList);

//GET Route for displaying the Add page - CREATE Operation
router.get('/add', requireAuth, bookController.displayAddPage);

//POST Route for processing the Add page - CREATE Operation
router.post('/add', requireAuth, bookController.processAddPage);

//GET Route for displaying the Edit page - UPDATE Operation
//Pass the information (specifically, id) from the book list to the edit page
//Search for the record with the id (from the parameters) and populate the edit page with the associated details
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

//POST Route for processing the Edit page - UPDATE Operation
router.post('/edit/:id', requireAuth, bookController.processEditPage);

//GET Route to perform Deletion - DELETE Operation
//search for the particular id from the parameters
router.get('/delete/:id', requireAuth, bookController.performDelete);

//Build up configuration for the router above and export into one single package, so that app.js knows where to look
module.exports = router;


//GET Route for the Book List page - this is the READ Operation
// router.get('/', (req,res,next) => { //Look at the top level route
//     Book.find((err, bookList) => { //When request is received, send a response
//         //If there is an error, return BookList
//         if(err)
//         {
//             return console.error(err); //Generate an error on the server side
//         }
//         else
//         {
//             // console.log(bookList);
//             //response render
//             //'book/list' is the view. {} is the object being pushed to the view
//             res.render('book/list', {title: 'Books', BookList: bookList}); //Pass bookList object into the BookList property
//         }
//     });
// });

// //GET Route for displaying the Add page - CREATE Operation
// router.get('/add', (req, res, next) => {
//     res.render('book/add', {title: 'Add Book'})
// });

//POST Route for processing the Add page - CREATE Operation
// router.post('/add', (req, res, next) => {
//     //Create newBook object
//     let newBook = Book({
//         "name": req.body.name,
//         "author": req.body.author,
//         "published": req.body.published,
//         "description": req.body.description,
//         "price": req.body.price
//     });

//     Book.create(newBook, (err, Book) => {
//         if (err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             //Refresh the book list
//             res.redirect('/book-list');
//         }
//     });
// });

//GET Route for displaying the Edit page - UPDATE Operation
//Pass the information (specifically, id) from the book list to the edit page
//Search for the record with the id (from the parameters) and populate the edit page with the associated details
// router.get('/edit/:id', (req, res, next) => {
//     let id = req.params.id;

//     Book.findById(id, (err, bookToEdit) => {
//         if (err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else{
//             //Show the edit view
//             res.render('book/edit', {title: 'Edit Book', book: bookToEdit})
//         }
//     });
// });

//POST Route for processing the Edit page - UPDATE Operation
// router.post('/edit/:id', (req, res, next) => {
//     let id = req.params.id;

//     let updatedBook = Book({
//         "_id": id,
//         "name": req.body.name,
//         "author": req.body.author,
//         "published": req.body.published,
//         "description": req.body.description,
//         "price": req.body.price
//     });

//     //Search for _id
//     Book.updateOne({_id: id}, updatedBook, (err) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             //Refresh the book list
//             res.redirect('/book-list');
//         }
//     });
// });

//GET Route to perform Deletion - DELETE Operation
//search for the particular id from the parameters
// router.get('/delete/:id', (req, res, next) => {
//     let id = req.params.id;

//     Book.remove({_id: id}, (err) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             //Refresh the book list
//             res.redirect('/book-list');
//         }
//     });
// });

// //Build up configuration for the router above and export into one single package, so that app.js knows where to look
// module.exports = router;
