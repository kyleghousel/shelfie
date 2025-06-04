document.addEventListener('DOMContentLoaded', () => {
  const scanner = document.getElementById('scanner')
  const resultEl = document.getElementById('isbn-result')
  const isbnInput = document.getElementById('book-isbn-input')
  const scanBtn = document.getElementById('start-scan-btn')
  const titleAdd = document.querySelector('#book-title-input')
  const authorAdd = document.querySelector('#book-author-input')
  const coverAdd = document.querySelector('#book-cover-input')

  scanBtn.addEventListener('click', () => {

    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: scanner,
        constraints: {
          facingMode: 'environment'
        }
      },
      decoder: {
        readers: ['ean_reader']
      }
    }, err => {
      if (err) {
        console.error('Quagga init error:', err)
        return
      }
      Quagga.start()
    })

    Quagga.onDetected(result => {
      const isbn = result.codeResult.code
      resultEl.textContent = `ISBN: ${isbn}`
      isbnInput.value = isbn
      fetch(`https://openlibrary.org/search.json?q=${isbn}`)
        .then(response => response.json())
        .then(searchData => {
          if (searchData.docs.length > 0) {
            titleAdd.value = searchData.docs[0].title
            authorAdd.value = searchData.docs[0].author_name[0]
            coverAdd.value = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
          } else {
            console.log(searchData)
          }
        })
      Quagga.stop()
    })
  })
})
