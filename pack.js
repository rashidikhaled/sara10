const packing = require("./build/compress-script")
packing().then((s) => {
  console.log("Packing is done.")
})
