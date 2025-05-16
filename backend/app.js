// Import the Express module
// Note: 'express' is actually a factory function that creates an Express application
const express = require('express');

// Import body-parser middleware
// This will help parse incoming request bodies in middleware
const bodyParser = require('body-parser');

// Create an Express application by calling the express() function
// This 'app' object will be the core of our web application
// It has methods for routing (get, post, etc.), configuration, and middleware
const app = express();

// Set the port number for our server
const PORT = 3000;

let books = [
    {
        bookName: "A Mind For Numbers",
        bookAuthor: "Barbara Oakley",
        bookPages: 332,
        bookPrice: 67.90,
        bookState: "Available"
    },
    {
        bookName: "Can't Hurt Me",
        bookAuthor: "David Goggins",
        bookPages: 366,
        bookPrice: 14.90,
        bookState: "Available"
    }
];

// Middleware
app.set('view engine', 'ejs'); // Configure the view engine to use EJS templates
app.use(bodyParser.json()); // To parse JSON request bodies
app.use(bodyParser.urlencoded({extended: true})); // To parse URL-encoded form data

// Home Route - Display Books
app.get("/", (req, res) => {
    res.render("home", {data: books});
});

// Add Book Route
app.post("/", (req, res) => {
    const newBook = {
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,
        bookPages: req.body.bookPages,
        bookPrice: req.body.bookPrice,
        bookState: "Available"
    };

    books.push(newBook);
    res.render("home", {data: books});
});

// Issue Book Route
app.post("/issue", (req, res) =>{
    const requestedBookName = req.body.bookName;
    books.forEach(book => {
        if(book.bookName === requestedBookName){
            book.bookState = "Issued";
        }
    });
    res.render("home", {data: books});
});

// Return Book Route
app.post("/return", (req, res) => {
    const requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Available";
        }
    });
    res.render("home", { data: books });
});

// Delete Book Route
app.post("/delete", (req, res) => {
    const requestedBookName = req.body.bookName; 
    books = books.filter(book => book.bookName !== requestedBookName);
    res.render("home", {data: books});
});

// Start Server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})