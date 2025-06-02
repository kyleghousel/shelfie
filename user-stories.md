# App concept: Catalog Your Personal Library

## Stories

### Feature 1 - Manually add book data to collection

User story: As a user, I want to manually submit books from my collection by filling out form criteria.
Details: Post data to a json-server and immediately display the entry on the page.

### Feature 2 - Fetch all books currently in library and display them on the page

User story: As a user, I want to see all books in my collection when the page loads
Details: Use a GET request to display all books on the page from the json-server.

### Feature 3 - Display book details

User story: As a user, I want to see additional information about a book in the library when I click on it
Details: When the user clicks on a book, an additional GET request is triggered to obtain the data about that entry and display it on the page.

### Feature 4 - Create dropdown providing dynamic form options

User story: As a user, I want a dropdown menu next to the main form so that I can dynamically switch between the form to add books, edit books, delete books, and search for books.

### Feature 5 - Edit book entries

User story: As a user, I want to be able to update my entries to account for mispellings or wanting to add details.
Details: Provide an additional form for editing an entry, targetting that entry's ID and sending a PATCH request to the json-server.

### Feature 6 - Delete book entries

User story: As a user, I want to be able to remove books from my collection in case they go missing or I give them away.
Details: Provide a button that both removes the related book elements from the DOM, and sends a DELETE request to the json-server.

### Feature 7 - Search for books

User story: As a user, I want to be able to search for books by genre or author to easily locate them should my collection become too large.
Details: Provide a new form entry that allows the user to search by genre or author to narrow the presently rendered collection to just the matching results, using the filter method.

## Stretch Stories

### Provide functionality for user to scan their book ISBN with their phone camera or web camera.

User story: As a user, I want to be able to use my camera to scan a book's ISBN.
Details: Use a third party library to add functionality to scan and store a book's ISBN.

### Use the ISBN to search Open Library API and append the matching result to the page

User story: As a user, I want to be able to use my book's ISBN to add books to my digital collection dynamically.
Details: Use the stored ISBN to search (.find) the Open Library API for a matching result, and append that result to the DOM.
