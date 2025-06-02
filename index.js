document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#book-form')
  const titleInput = document.querySelector('#book-title-input')
  const authorInput = document.querySelector('#book-author-input')
  const coverImgInput = document.querySelector('#book-cover-input')
  const genreInput = document.querySelector('#book-genre-input')

  const bookCollection = document.querySelector('#book-collection')

  const titleDetails = document.querySelector('#title')
  const coverDetails = document.querySelector('#cover-img')
  const authorDetails = document.querySelector('#author')
  const genreDetails = document.querySelector('#genres')


  form.addEventListener('submit', (e) => {
    e.preventDefault()

    addBook()
  })

  const addBook = () => {
    const genresArr = genreInput.value.split(',').map(genre => genre.trim())

    fetch('http://localhost:3000/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      title: titleInput.value,
      author: authorInput.value,
      cover: coverImgInput.value,
      genre: genresArr
    })
    })
      .then(response => response.json())
      .then(newBook => {
        const newBookCover = updateCollection(newBook)

        newBookCover.addEventListener('click', () => {
          displayBookDetails(book)
        })

        bookCollection.appendChild(newBookCover)
      })
  }

  const getBooks = () => {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        books.forEach(book => {
          const bookCover = updateCollection(book)

          bookCover.addEventListener('click', () => {
          displayBookDetails(book)
          })

          bookCollection.appendChild(bookCover)
        })
      })
  }

  const updateCollection = (book) => {
    const bookCover = document.createElement('img')
    bookCover.setAttribute('src', book.cover)
    bookCover.classList.add('book-shelf')

    return bookCover
  }

  const displayBookDetails = (book) => {
    titleDetails.textContent = book.title
    coverDetails.setAttribute('src', book.cover)
    authorDetails.textContent = `Author: ${book.author}`
    genreDetails.textContent = book.genre.length > 1 ? `Genres: ${book.genre.join(', ')}` : `Genre: ${book.genre}`
  }

  const pageLoad = () => {
    fetch('http://localhost:3000/books?_sort=id&_order=asc&_limit=1')
      .then(response => response.json())
      .then(bookData => {
        const firstBook = bookData[0]
        getBooks()
        displayBookDetails(firstBook)
      })
  }

  pageLoad()
})
