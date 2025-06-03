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

  const dropdown = document.querySelector('#mode-select')
  const bookAddDiv = document.querySelector('#add-book')
  const bookDeleteDiv = document.querySelector('#delete-book')
  const bookEditDiv = document.querySelector('#edit-book')
  const bookSearchDiv = document.querySelector('#search-book')

  const idEditInput = document.querySelector('#id-edit')
  const titleEditInput = document.querySelector('#title-update')
  const authorEditInput = document.querySelector('#author-update')

  const idDeleteInput = document.querySelector('#book-remove')

  dropdown.addEventListener('change', () => getDropdownValue())

  const getDropdownValue = () => {
    if (dropdown.value === 'search') {
      bookSearchDiv.classList.remove('hidden')
      bookAddDiv.classList.add('hidden')
      bookDeleteDiv.classList.add('hidden')
      bookEditDiv.classList.add('hidden')
    } else if (dropdown.value === 'add') {
      bookAddDiv.classList.remove('hidden')
      bookDeleteDiv.classList.add('hidden')
      bookSearchDiv.classList.add('hidden')
      bookEditDiv.classList.add('hidden')
    } else if (dropdown.value === 'delete') {
      bookAddDiv.classList.add('hidden')
      bookDeleteDiv.classList.remove('hidden')
      bookSearchDiv.classList.add('hidden')
      bookEditDiv.classList.add('hidden')
    } else if (dropdown.value === 'edit') {
      bookAddDiv.classList.add('hidden')
      bookDeleteDiv.classList.add('hidden')
      bookSearchDiv.classList.add('hidden')
      bookEditDiv.classList.remove('hidden')
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!bookAddDiv.classList.contains('hidden')) {
      addBook()

      titleInput.value = ''
      authorInput.value = ''
      coverImgInput.value = ''
      genreInput.value = ''

    } else if (!bookDeleteDiv.classList.contains('hidden')) {
      deleteBook(idDeleteInput.value)
    } else if (!bookEditDiv.classList.contains('hidden')) {
      editBook(idEditInput.value)

      titleEditInput.value = ''
      authorEditInput.value = ''
    } else if (!bookSearchDiv.classList.contains('hidden')) {
      console.log('Search dat book!')
    }

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
          displayBookDetails(newBook)
          if (dropdown.value === 'edit') {
            idEditInput.value = newBook.id
          } else if (dropdown.value === 'delete') {
            idDeleteInput.value = newBook.id
          }
        })

        newBookCover.setAttribute('id', newBook.id)

        bookCollection.appendChild(newBookCover)
        displayBookDetails(newBook)
      })
      .catch(error => console.log("Error: ", error.message))
  }

  const getBooks = () => {
    bookCollection.innerHTML = ''

    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        books.forEach(book => {

          const bookCover = updateCollection(book)

          bookCover.setAttribute('id', book.id)

          bookCover.addEventListener('click', () => {
            displayBookDetails(book)
            if (dropdown.value === 'edit') {
              idEditInput.value = book.id
            } else if (dropdown.value === 'delete') {
              idDeleteInput.value = book.id
            }
          })

          bookCollection.appendChild(bookCover)

        })
      })
      .catch(error => console.log("Error: ", error.message))
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

  const editBook = (id) => {
    fetch(`http://localhost:3000/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
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
      .catch(error => console.log("Error: ", error.message))
  }

  const deleteBook = (id) => {
    fetch('http://localhost:3000/books/'+id, {
      method: 'DELETE'
    })
      .then(() => {
        const targetBook = document.getElementById(id)
        targetBook.remove()
        pageLoad()
      })
  }

  const pageLoad = () => {
    fetch('http://localhost:3000/books?_sort=id&_order=asc&_limit=1')
      .then(response => response.json())
      .then(bookData => {
        const firstBook = bookData[0]
        getBooks()
        displayBookDetails(firstBook)
        getDropdownValue()
      })
      .catch(error => console.log("Error: ", error.message))
  }



  pageLoad()
})
