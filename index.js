document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#book-form')
  const titleInput = document.querySelector('#book-title-input')
  const authorInput = document.querySelector('#book-author-input')
  const coverImgInput = document.querySelector('#book-cover-input')
  const genreInput = document.querySelector('#book-genre-input')

  const bookCollection = document.querySelector('#book-collection')


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

        bookCollection.appendChild(newBookCover)
      })
  }

  const getBooks = () => {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        books.forEach(book => {
          const bookCover = updateCollection(book)

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

  getBooks()
})
