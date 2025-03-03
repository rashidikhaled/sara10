quasarBuild()

function info (msg) {
  console.log(`\x1b[36m${msg}\x1b[0m`)
}

function log (msg) {
  console.log(`\x1b[0m${msg}\x1b[0m`)
}

function error (msg) {
  console.log(`\x1b[31m${msg}\x1b[0m`)
}

function success (msg) {
  console.log(`\x1b[32m${msg}\x1b[0m`)
}

function warning (msg) {
  console.log(`\x1b[33m${msg}\x1b[0m`)
}

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
function quasarBuild () {
  const { exec } = require('child_process')
  const result = exec('quasar build', { 'shell': 'powershell.exe' })
  result.stdout.on('data', (data) => {
    const dataString = `${data}`
    if (`${data}`.indexOf('Build succeeded') > -1) {
      success(dataString)
      result.stdin.end()
    } else if (dataString.indexOf('App ') > -1) {
      info(dataString)
    } else {
      // log(dataString)
    }
  })

  info(' Build Starting...')
  info('')
  result.stderr.on('data', (data) => {
    if (`${data}`.indexOf('Build succeeded') > -1) {
      success(`${data}`)
      result.stdin.end()
    } else {
      error(`${data}`)
    }
  })
}
