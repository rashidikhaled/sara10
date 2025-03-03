const { compatibility } = require("../../build.json")
import { ping } from "../services/security"

export default async function versionComparator () {
  console.log("hi :D")
  let versionsObj = {}
  const { data } = await ping({})
  versionsObj.security = data.data.version
  console.log(compatibility)
  for (const cItem in compatibility) {
    console.log(compatibility[cItem])
    for (const vItem in versionsObj) {
      if (cItem.indexOf('^')) {
        if (compatibility[cItem] >= versionsObj[vItem]) {
          alert(`update versions ${versionsObj[vItem]}`)
          return
        }
      }
      // if (cItem.includes('*')) {
      //   if (cItem !== vItem) {
      //     alert(`update versions ${{ cItem, vItem }}`)
      //     return
      //   }
      // }
    }
  }
}
