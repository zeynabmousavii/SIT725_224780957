const booksService = require("../services/books.service");

const getAllBooks = async (req, res) => {
  try {
    const books = await booksService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await booksService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById
};