const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const booksRoutes = require("./routes/books.routes");

const app = express();
const PORT = 3000;



const mongoURI = "mongodb://127.0.0.1:27017/booksDB";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", booksRoutes);

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });