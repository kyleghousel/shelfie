document.addEventListener('DOMContentLoaded', () => {
  const url = 'http://localhost:3000/books/'

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

  const dropdown = document.querySelector('#mode-select')
  const bookAddDiv = document.querySelector('#add-book')
  const bookEditDiv = document.querySelector('#edit-book')
  const bookDeleteDiv = document.querySelector('#delete-book')
  const bookSearchDiv = document.querySelector('#search-book')

  const idEditInput = document.querySelector('#id-edit')
  const titleEditInput = document.querySelector('#title-update')
  const authorEditInput = document.querySelector('#author-update')

  const idDeleteInput = document.querySelector('#book-remove')

  const authorSearchInput = document.querySelector('#author-search')
  const genreSearchInput = document.querySelector('#genre-search')

  const scannerDiv = document.querySelector('#scanner-div')

  const getDropdownValue = () => {
    [bookAddDiv, bookEditDiv, bookDeleteDiv, bookSearchDiv, scannerDiv].forEach(div => div.classList.add('hidden'))

    if (dropdown.value === 'add') {
      bookAddDiv.classList.remove('hidden')
      scannerDiv.classList.remove('hidden')
    } else if (dropdown.value === 'edit') {
      bookEditDiv.classList.remove('hidden')
    } else if (dropdown.value === 'delete') {
      bookDeleteDiv.classList.remove('hidden')
    } else if (dropdown.value === 'search') {
      bookSearchDiv.classList.remove('hidden')
    }
  }

  dropdown.addEventListener('change', getDropdownValue)

  const clearInputs = () => {
    titleInput.value = ''
    authorInput.value = ''
    coverImgInput.value = ''
    genreInput.value = ''

    titleEditInput.value = ''
    authorEditInput.value = ''

    authorSearchInput.value = ''
    genreSearchInput.value = ''
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!bookAddDiv.classList.contains('hidden')) {
      addBook()
      clearInputs()
    } else if (!bookDeleteDiv.classList.contains('hidden')) {
      deleteBook(idDeleteInput.value)
      clearInputs()
    } else if (!bookEditDiv.classList.contains('hidden')) {
      editBook(idEditInput.value)
      clearInputs()
    } else if (!bookSearchDiv.classList.contains('hidden')) {
      searchBooks()
    }
  })

  const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

  const logError = (error) => {
    console.log("Error: ", error.message)
  }

  const getBooks = () => {
    bookCollection.innerHTML = ''

    fetch(url)
      .then(response => response.json())
      .then(books => {
        books.forEach(book => {
          renderBookCover(book)
        })
      })
      .catch(logError)
  }

  const addBook = () => {
    const genresArr = genreInput.value.split(',').map(genre => genre.trim().toLowerCase())

    fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        title: titleInput.value,
        author: authorInput.value,
        cover: coverImgInput.value,
        genre: genresArr
      })
    })
      .then(response => response.json())
      .then(newBook => {
        renderBookCover(newBook)
        displayBookDetails(newBook)
      })
      .catch(logError)
  }

  const updateCollection = (book) => {
    const bookCover = document.createElement('img')
    bookCover.setAttribute('src', book.cover)
    bookCover.classList.add('book-shelf')
    bookCover.setAttribute('id', book.id)

    return bookCover
  }

  const displayBookDetails = (book) => {
    titleDetails.textContent = book.title
    coverDetails.setAttribute('src', book.cover)
    authorDetails.textContent = `Author: ${book.author}`
    genreDetails.textContent = book.genre.length > 1 ? `Genres: ${book.genre.join(', ')}` : `Genre: ${book.genre}`
  }

  const renderBookCover = (book) => {
    const bookCover = updateCollection(book)

    bookCover.addEventListener('click', () => {
      displayBookDetails(book)
      if (dropdown.value === 'edit') {
        idEditInput.value = book.id
      } else if (dropdown.value === 'delete') {
        idDeleteInput.value = book.id
      }
    })

    bookCollection.appendChild(bookCover)
  }

  const editBook = (id) => {
    fetch(url+id, {
      method: 'PATCH',
      headers: defaultHeaders,
      body: JSON.stringify({
        title: titleEditInput.value ? titleEditInput.value : titleDetails.textContent,
        author: authorEditInput.value ? authorEditInput.value : authorDetails.textContent
      })
    })
      .then(response => response.json())
      .then(editedBook => {
        displayBookDetails(editedBook)
        getBooks()
      })
      .catch(logError)
  }

  const deleteBook = (id) => {
    fetch(url+id, {
      method: 'DELETE'
    })
      .then(() => {
        const targetBook = document.getElementById(id)
        targetBook.remove()
        pageLoad()
      })
  }

  const searchBooks = () => {
    bookCollection.innerHTML = ''

    fetch(url)
      .then(response => response.json())
      .then(books => {
        let filteredBooks = books

        if (authorSearchInput.value) {
          filteredBooks = books.filter(book => book.author === authorSearchInput.value)
        } else if (genreSearchInput.value) {
          filteredBooks = books.filter(book => book.genre.includes(genreSearchInput.value.toLowerCase()))
        }

        filteredBooks.forEach(filteredBook => {
          renderBookCover(filteredBook)
        })

        clearInputs()
      })
      .catch(logError)
  }

  const pageLoad = () => {
    fetch(`${url}?_sort=id&_order=asc&_limit=1`)
      .then(response => response.json())
      .then(bookData => {
        const firstBook = bookData[0]
        getBooks()
        displayBookDetails(firstBook)
        getDropdownValue()
      })
      .catch(logError)
  }

  pageLoad()
})
