# Shelfie

As a user,
I want to be able to manually submit, or scan the books in my personal collection with my phone or webcam, to then catalog them into a digital library with its own database and Front-End GUI,
So that I can better keep track of my personal library.

## Core Features:

- Manual entry with provided form
- Click on a book in the collection to display it’s data
- Edit or delete entries with additional form
- Search for entries within the current collection by genre or author
- Scan books ISBN -> match data to Open Library API -> Auto complete form -> Add data to db.json file

## Expected Challenges:

- Making the GUI interactive and aesthetically pleasing
- Making the form dynamic via dropdown selection
- Searching from _either_ genre or author.
- Getting this third party scan functionality to work (especially if I use the phone scanner…getting that to work with my local)
- Matching the data to the Open Library API and then adding it to my own db.json file

## How I am meeting the requirements of the project:

1. Your app must be a HTML/CSS/JS frontend that accesses data from a public API or from a db.json file using json-server. Your API or db.json should return a collection of at least 5 objects with each object having at least 3 attributes. All interactions between the client and the API should be handled asynchronously and use JSON as the communication format. Try to avoid using an API that requires a key. APIs that are free and require no authorization will be easiest to use.
   - Manual entries will be added to and fetched from a json-server
   - Accesses data from OpenLibrary API after scan
   - Data from API will then be added to and pulled from db.json file
2. Your entire app must run on a single page. There should be NO redirects or reloads. In other words, your project will contain a single HTML file.
   - Single page web-app with a dropdown that displays/hides each form.
   - Book covers are visually added to the collection
   - When a book is clicked, it displays that book’s info on the page in a separate div
   - User search by author or genre
3. Use at least 3 distinct event listeners (3 events of different types) that enable interactivity. What this means is that, if you had 3 click events, that would only count as 1 distinct event and you would need to add at least 2 more. Think search or filter functionality, toggling dark/light mode, upvoting posts, etc. Each of your event listeners should also have its own unique callback function. These must be added using JavaScript's .addEventListener() method. Events embedded into HTML elements and CSS will not count toward the total. Please ask your instructor if you have questions regarding this requirement.
   - Form submit
   - Click events on each book cover
   - Dropdown change event
4. Your project must implement at least one instance of array iteration using available array methods (map, forEach, filter, etc). Manipulating your API data in some way should present an opportunity to implement your array iteration.
   - User can search collection by genre or author -> filter
5. Follow good coding practices. Keep your code DRY (Do not repeat yourself) by utilizing functions to abstract repetitive code.
