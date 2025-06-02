document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#book-form')
  const titleInput = document.querySelector('#book-title-input')
  const authorInput = document.querySelector('#book-author-input')
  const coverImgInput = document.querySelector('#book-cover-input')
  const genreInput = document.querySelector('#book-genre-input')


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
        console.log(newBook)
      })
  }

})
