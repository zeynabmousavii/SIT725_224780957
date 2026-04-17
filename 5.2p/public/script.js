const getBooksBtn = document.getElementById("getBooksBtn");
const booksList = document.getElementById("books-list");
const bookDetails = document.getElementById("book-details");

getBooksBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/books");
    const books = await response.json();

    booksList.innerHTML = "";

    books.forEach((book) => {
      const item = document.createElement("div");
      item.className = "book-item";
      item.textContent = `${book.title} ${book.price.$numberDecimal} AUD`;

      item.addEventListener("click", async () => {
        const detailResponse = await fetch(`/api/books/${book.id}`);
        const detailBook = await detailResponse.json();

        bookDetails.innerHTML = `
          <h3>Book Details</h3>
          <p><strong>Title:</strong> ${detailBook.title}</p>
          <p><strong>Author:</strong> ${detailBook.author}</p>
          <p><strong>Year:</strong> ${detailBook.year}</p>
          <p><strong>Genre:</strong> ${detailBook.genre}</p>
          <p><strong>Summary:</strong> ${detailBook.summary}</p>
          <p><strong>Price (AUD):</strong> ${detailBook.price.$numberDecimal}</p>
        `;
      });

      booksList.appendChild(item);
    });
  } catch (error) {
    booksList.innerHTML = "<p>Failed to load books.</p>";
    console.error(error);
  }
});