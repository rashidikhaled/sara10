const path = require("path")
const fs = require("fs")
const { globSync } = require("glob")

// build info
const pjson = require("../package.json")
const build = require("../build.json")
const { exec } = require("child_process")
const projectName = pjson.name
const buildVersion = getBuildVersion()

function log (msg) {
  console.log(`\x1b[0m${msg}\x1b[0m`)
}

function info (msg) {
  console.log(`\x1b[36m${msg}\x1b[0m`)
}

function error (msg) {
  console.log(`\x1b[31m${msg}\x1b[0m`)
}

function success (msg) {
  console.log(`\x1b[32m${msg}\x1b[0m`)
}

const replacements = [] // ['filename','term','replacement']
const filesMustBeRemove = [
  "*_config.*",
  "web.config.dat",
  "web.config.gz",
  "web.config.*",
  "security/*.gz"
  // "**/*.gz"
]

async function cleanFiles () {
  const filename = ""
  let regex
  replacements.forEach((item) => {
    const [filename, searchTerm, replaceStr] = item
    // console.log(filename, searchTerm, replaceWord)
    const files = globSync(filename)
    files.forEach((f) => {
      const fullPath = path.resolve(__dirname, "../", f)
      let data = fs.readFileSync(fullPath, "utf-8")
      const regex =
        searchTerm instanceof RegExp ? searchTerm : new RegExp(searchTerm)
      regex.global = true
      let content = data.toString()
      content = content.replace(regex, replaceStr)
      fs.writeFileSync(fullPath, content, "utf-8")
    })
  })

  filesMustBeRemove.forEach((name) => {
    const files = globSync(`dist/spa/${name}`, {})
    files.forEach((filename) => {
      console.warn("deleted filename: ", filename)
      const fullPath = path.resolve(__dirname, "../", filename)
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath)
      }
    })
    // if (fs.existsSync(path.resolve(__dirname, '../dist/spa/', name + '.gz'))) {
    //   fs.unlinkSync(path.resolve(__dirname, '../dist/spa/', name + '.gz'))
    // }
  })

  fs.copyFile(
    path.resolve(__dirname, "../config/base_config.js"),
    path.resolve(__dirname, "../dist/spa/web.config.js"),
    (err) => {
      if (err) throw err
      console.log("base config was copied successfully.")
    }
  )
}

async function removeJsComments (dir) {
  const currentDir = path.resolve(__dirname, "../dist/spa/", dir)
  const files = fs.readdirSync(currentDir)

  for (const file of files) {
    const fullPath = path.join(currentDir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      await removeJsComments(fullPath)
    } else if (path.extname(file) === ".js") {
      const data = fs.readFileSync(fullPath, "utf8")
      const uncommented = data.replace(/\/\/.*|\/\*[^]*?\*\//g, "")
      fs.writeFileSync(fullPath, uncommented, "utf8")
      console.warn(`comments removed from ${fullPath}`)
    }
  }
}

async function cleanIndexHtml () {
  const currentDir = path.resolve(__dirname, "../dist/spa")
  const fullPath = path.join(currentDir, "index.html")
  const data = fs.readFileSync(fullPath, "utf8")
  const htmlContent = disableDevTools(data)
    .replaceAll(`nonce="3cSE6nsJp8ZTKdTJoyNJkwZgyrf84SGXBrMM0gB785Y"`, "")
    .replace(
      /<script /g,
      '<script nonce="3cSE6nsJp8ZTKdTJoyNJkwZgyrf84SGXBrMM0gB785Y" '
    )
    .replace(
      /<link /g,
      '<link nonce="3cSE6nsJp8ZTKdTJoyNJkwZgyrf84SGXBrMM0gB785Y" '
    )

  fs.writeFileSync(fullPath, htmlContent, "utf8")
}

function disableDevTools (htmlContent) {
  const js = `<script>!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){"use strict";function t(t){function n(e){1!=="".concat(t/t).length||t%20==0?function(){return!0}.constructor("debugger").call("action"):function(){return!1}.constructor("debugger").apply("stateObject"),n()}try{if(t)return n;n()}catch(t){}}!function(){var n;try{n={}.constructor("return this")()}catch(t){n=window}n.setInterval(t,4e3)}(),function(){function t(t,n){return t.ctrlKey&&t.shiftKey&&t.key===n}document.addEventListener("keydown",(function(n){("F12"===n.key||t(n,"i")||t(n,"j")||n.ctrlKey&&"u"===n.key)&&n.preventDefault()}))}()}));</script>`
  return htmlContent.replace(`<!-- postjs-->`, js)
}

async function compressSpaFile () {
  const { exec } = require("child_process")

  info("Cleaning files...")
  await cleanFiles()
  await cleanIndexHtml()

  const forceToCleanDirectories = ["security"]

  for (const dir of forceToCleanDirectories) {
    await removeJsComments(dir)
  }

  const filename = `${projectName}-v${buildVersion}.zip`

  if (fs.existsSync(path.resolve(__dirname, "../dist/", filename))) {
    fs.unlinkSync(path.resolve(__dirname, "../dist/", filename))
  }
  if (fs.existsSync(`P:\\Output\\sara10\\${filename}`)) {
    fs.unlinkSync(`P:\\Output\\sara10\\${filename}`)
  }
  exec(
    `
  $FileName = "P:\\Output\\sara10\\${filename}"

if (Test-Path $FileName) {
  Remove-Item $FileName
  write-host "$FileName has been deleted"
}

else {
  Write-host "$FileName doesn't exist"
}
  `,
    { shell: "powershell.exe" }
  )

  info("Now! compressing build file started...")
  const cmd = `powershell Compress-Archive ./dist/spa './dist/${filename}'`
  const compressResult = exec(cmd, { shell: "powershell.exe" })
  compressResult.on("close", (code) => {
    exec(
      `copy "P:\\Projects\\sara10Source\\dist\\${filename}" "P:\\Output\\sara10\\"`,
      { shell: "powershell.exe" }
    )
    success(`file:${filename} was successfully generated.`)
    exec(`explorer.exe "/select,P:\\Output\\sara10\\${filename}"`, {
      shell: "powershell.exe"
    })
  })
  compressResult.stderr.on("data", (data) => {
    error(`${data}`)
  })
}

function getBuildVersion () {
  /* const data = fs.readFileSync(path.resolve(__dirname, '../build.json'), { encoding: 'utf-8' })
  const lines = data.split(/\r?\n/)
  let version = ''
  lines.forEach(line => {
    if (line.indexOf('version') > -1) {
      const str = line.split(',')[0].split(':')[1].replace(/'/g, '').replace(/,/g, '').trim()
      version = str.split('|').map(s => `${s}`.trim()).join('-')
    }
  })
  return `${version}` */
  // return build.version.split('|').map(s => `${s}`.trim()).join('-')
  return `${build.version ?? ""}`.replace(/\./g, "-")
}

module.exports = compressSpaFile

// compressSpaFile()
