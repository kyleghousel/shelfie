document.addEventListener('DOMContentLoaded', () => {
  const scannerContainer = document.getElementById('scanner-container')
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
        target: scannerContainer,
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
      console.log('Detected ISBN:', isbn)
      resultEl.textContent = `ISBN: ${isbn}`
      isbnInput.value = isbn
      fetch(`https://openlibrary.org/search.json?q=${isbn}`)
        .then(response => response.json())
        .then(searchData => {
          titleAdd.value = searchData.docs[0].title
          authorAdd.value = searchData.docs[0].author_name[0]
          coverAdd.value = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
        })
      Quagga.stop()
    })
  })
})
