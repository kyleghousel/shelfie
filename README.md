# Shelfie

As a user,
I want to be able to manually submit, or scan the books in my personal collection with my phone or webcam, to then catalog them into a digital library with its own database and Front-End GUI,
So that I can better keep track of my personal library.

## Core Features:

- Manual entry with provided form
- Click on a book in the collection to display it’s data
- Edit or delete entries with additional form
- Search for entries within the current collection by genre or author
- Scan books ISBN -> match data to Open Library API -> Auto complete form -> Add data to db.json file.
  - (Note: this functionality relies on a library, and honestly isn't super accurate)
    ![The scanner brings me pain](./imgs/anchor.jpg)

## Run Instructions

- This project has been deployed to Render.
- [Link for Front-end](https://shelfie-psif.onrender.com/)
- [Link for Back-end](https://shelfie-back-end.onrender.com/books)
- Front-end link should stay live. The back-end sleeps after 15 minutes of inactivity, with a ~30sec cold start upon receiving a new request.
