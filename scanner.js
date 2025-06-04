document.addEventListener('DOMContentLoaded', () => {
  const scannerContainer = document.getElementById('scanner-container')
  const resultEl = document.getElementById('isbn-result')
  const isbnInput = document.getElementById('book-isbn-input')
  const scanBtn = document.getElementById('start-scan-btn')

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
      Quagga.stop()
    })
  })
})
