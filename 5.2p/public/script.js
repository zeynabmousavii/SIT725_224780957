document.addEventListener("DOMContentLoaded", async () => {
  const booksList = document.getElementById("books-list");

  try {
    const response = await fetch("/api/books");
    const books = await response.json();

    books.forEach(book => {
      const bookItem = document.createElement("div");
      bookItem.className = "book-card";
      bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
      `;
      booksList.appendChild(bookItem);
    });
  } catch (error) {
    booksList.innerHTML = "<p>Failed to load books.</p>";
    console.error("Error fetching books:", error);
  }
});