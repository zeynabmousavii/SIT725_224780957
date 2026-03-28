const express = require("express");
const app = express();
const port = 3000;

// serve frontend files
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// sample data
const books = [
  {
    title: "Atomic Habits",
    image: "images/book1.jpg",
    link: "About this book",
    description: "A book about building good habits."
  },
  {
    title: "Deep Work",
    image: "images/book2.jpg",
    link: "About this book",
    description: "A book about focus and productivity."
  },
  {
    title: "Clean Code",
    image: "images/book3.jpg",
    link: "About this book",
    description: "A book about writing clean code."
  }
];

// API
app.get("/api/books", (req, res) => {
  res.json({
    statusCode: 200,
    data: books
  });
});

// start server
app.listen(port, () => {
  console.log("App listening to port: " + port);
});