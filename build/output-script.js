/*  Make Grid and Resource files */
console.log('[*] clean output...')

const fs = require('fs')
const path = require('path')
const build = require('../build')

function updateHtmlTitle () {
  const filePath = path.resolve(__dirname, '../src/index.template.html')
  let fileContent = fs.readFileSync(filePath, 'utf-8').toString('utf-8')
  const lines = fileContent.split('\n')
  for (let line of lines) {
    const titleRegex = line.match(/<title>(.+)<\/title>/)
    if (titleRegex) {
      const currentTitle = titleRegex[1]
      const newTitle = build.appTitle
      fileContent = fileContent.replace(currentTitle, newTitle)
    }
  }
  try {
    fs.writeFileSync(filePath, fileContent)
  } catch (err) {
    console.error(err)
  }
}

module.exports = updateHtmlTitle
