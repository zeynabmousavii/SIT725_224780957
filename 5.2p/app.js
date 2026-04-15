const express = require("express");
const path = require("path");
const booksRoutes = require("./routes/books.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", booksRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});