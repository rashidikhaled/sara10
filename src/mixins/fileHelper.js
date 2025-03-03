export default {
  methods: {
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    fileToByteArray (file) {
      return new Promise((resolve, reject) => {
        try {
          let reader = new FileReader()
          let fileByteArray = []
          reader.readAsArrayBuffer(file)
          reader.onloadend = (evt) => {
            if (evt.target.readyState === FileReader.DONE) {
              let arrayBuffer = evt.target.result,
                array = new Uint8Array(arrayBuffer)
              for (const byte of array) {
                fileByteArray.push(byte)
              }
            }
            resolve(fileByteArray)
          }
        } catch (e) {
          reject(e)
        }
      })
    },
    dataURLtoFile (dataurl, filename) {
      if (dataurl.indexOf(',') === -1) dataurl = `officedocument.wordprocessingml.document;base64,${dataurl}`
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, { type: mime })
    },
    arrayBufferToBase64 (buffer) {
      let binary = ''
      let bytes = new Uint8Array(buffer)
      let len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return window.btoa(binary)
    },
    blobToFile (theBlob, fileName) {
      return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
    },
    getImageMimeType (bytearray) {
      return new Promise((resolve, reject) => {
        try {
          const blob = new Blob([new Uint8Array(bytearray)])
          const fileReader = new FileReader()
          fileReader.onloadend = function (e) {
            const arr = (new Uint8Array(e.target.result)).subarray(0, 4)
            let header = ''
            for (let i = 0; i < arr.length; i++) {
              header += arr[i].toString(16)
            }
            let type = ''
            switch (header) {
              case '89504e47':
                type = 'image/png'
                break
              case '47494638':
                type = 'image/gif'
                break
              case 'ffd8ffe0':
              case 'ffd8ffe1':
              case 'ffd8ffe2':
              case 'ffd8ffe3':
              case 'ffd8ffe8':
                type = 'image/jpeg'
                break
              default:
                type = 'image/jpeg' // Or you can use the blob.type as fallback
                break
            }
            console.log(header, type)
            return resolve(type)
            // Check the file signature against known types
          }
          fileReader.readAsArrayBuffer(blob)
        } catch (ex) {
          return reject(ex)
        }
      })
    },
    downloadFile (file) {
      file.arrayBuffer().then((arrayBuffer) => {
        let blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type })
        const url = window.URL.createObjectURL(blob)
        // window.open(url, '_blank')
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = file.name
        a.click()
        setTimeout(() => {
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }, 0)
      })
    }
  }
}
