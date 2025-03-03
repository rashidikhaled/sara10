// CONSTANTS
const ICONS = ['', 'Block', 'House', 'Building', 'Apartment', 'HouseSharing', 'Shop']
const NAMES = ['حوزه', 'بلوک', 'ملک', 'ساختمان', 'آپارتمان', 'دستگاه', 'صنفی']
const SECTIONS = ['District', 'Region', 'Block', 'House', 'Building', 'Apartment', 'Shop']

// EumNosaziCodeObjType
// {
//   [Description("نامشخص"]
//   None = 0,
//     [Description("بلوک"]
//   Block = 1,
//     [Description("ملک"]
//   House = 2,
//     [Description("ساختمان"]
//   Building = 3,
//     [Description("آپارتمان"]
//   Apartment = 4,
//     [Description("دستگاه"]
//   HouseSharing = 5,
//     [Description("صنفی"]
//   Shop = 6
// };
export function convertNosaziCodeObjectToString (nosaziCode) {
  return `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}-${nosaziCode.Building}-${nosaziCode.Apartment}-${nosaziCode.Shop}`
}

export function convertStringToNosaziCodeObject (str = '') {
  const split = str.split('-')
  const obj = {}
  SECTIONS.forEach((part, i) => {
    obj[part] = Number(split[i]) || 0
  })
  return obj
}

function getChildrenInObject (baseLibInNosaziCode) {
  const tree = []
  let head = tree
  for (const part of ['BlockObj', 'HouseObj', 'HouseSharingObj', 'BuildingObj', 'ApartmentObj', 'ShopObj']) {
    const code = baseLibInNosaziCode[part]
    if (!code) {
      continue
    }

    const nosaziCode = { ...code }
    nosaziCode.name = NAMES[nosaziCode.EumNosaziCodeObjType]
    nosaziCode.icon = ICONS[nosaziCode.EumNosaziCodeObjType]
    nosaziCode.nosaziCodeString = convertNosaziCodeObjectToString(nosaziCode)
    nosaziCode.label = nosaziCode.nosaziCodeString
    nosaziCode.children = []
    head.push(nosaziCode)
    head = nosaziCode.children
  }
  return tree
}

export function compareNosaziCodeObjects (l, r) {
  for (const part of SECTIONS) {
    const diff = Number(l[part]) - Number(r[part])
    if (diff !== 0) {
      return diff
    }
  }
  return 0
}

export function compareNosaziCodeStrings (a, b) {
  for (let i = 0; i < SECTIONS.length; i++) {
    const diff = Number(a.key.split('-')[i]) - Number(b.key.split('-')[i])
    if (diff !== 0) {
      return diff > 0 ? 1 : -1
    }
  }
  return 0
}

function getChildren (list, parent) {
  return list
    .filter(x => x.NidNosaziCodeParent === parent.NidNosaziCode)
    .map(x => ({ ...x, children: getChildren(list, x) }))
    .reduce((acc, current) => {
      const isExist = acc.some(item => item.key === current.key)
      if (!isExist) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])
    .sort(compareNosaziCodeStrings)
}

function bindNosaziItem (item) {
  const nosaziCodeStr = convertNosaziCodeObjectToString(item)
  let newObj = { ...item }
  newObj.name = NAMES[item.EumNosaziCodeObjType]
  newObj.icon = ICONS[item.EumNosaziCodeObjType]
  newObj.label = nosaziCodeStr
  newObj.key = nosaziCodeStr
  newObj.id = item.Id
  newObj.nosaziCodeString = nosaziCodeStr
  return newObj
}

export function createTree (list = []) {
  if (!Array.isArray(list)) return getChildrenInObject(list) // TODO: implement for other type
  // Some error found here that object type is zero (0)
  const cleanList = list.map(bindNosaziItem).filter(x => x.EumNosaziCodeObjType > 0)
  let root = cleanList.find(x => x.IsRoot)
  if (!root) root = cleanList.find(x => x.EumNosaziCodeObjType === 5)
  if (!root) {
    root = cleanList.reduce((state, x) => x.EumNosaziCodeObjType < state.EumNosaziCodeObjType ? x : state)
  }
  if (root) {
    return [{
      ...root,
      children: getChildren(cleanList, root)
    }]
  }
  return []
}

export function createRevisitTree (list = []) {
  /* list = [
    {
      'Apartment': 0,
      'Block': 84,
      'Building': 0,
      'District': 1,
      'EumNosaziCodeObjType': 2,
      'House': 1,
      'Id': '/10591/5/',
      'NidBase': 'd074c266-67eb-4de3-bf66-990dec243798',
      'NidNosaziCode': '78ac999d-3a89-4152-ad5e-81589a018af6',
      'ParentId': '/10591/',
      'Region': 10,
      'Shop': 0
    },
    {
      'Apartment': 0,
      'Block': 84,
      'Building': 16,
      'District': 1,
      'EumNosaziCodeObjType': 5,
      'House': 1,
      'Id': '/10591/2/22/',
      'NidBase': '312d4061-ec6c-4822-8cdf-3fb7ffac6baa',
      'NidNosaziCode': 'a3566cbf-ef10-4690-bf52-fffa9874c010',
      'ParentId': '/10591/2/',
      'Region': 10,
      'Shop': 0
    },
    {
      'Apartment': 2,
      'Block': 84,
      'Building': 16,
      'District': 1,
      'EumNosaziCodeObjType': 4,
      'House': 1,
      'Id': '/10591/2/22/40/',
      'NidBase': '944bcad8-bc58-42d5-b1bf-7494e0847325',
      'NidNosaziCode': 'd4ca7086-7f0a-4e49-8013-b3be08cee9de',
      'ParentId': '/10591/2/22/',
      'Region': 10,
      'Shop': 0
    }
  ] */
  if (!Array.isArray(list)) return getChildrenInObject(list) // TODO: implement for other type
  let nodes = [...list.map(bindNosaziItem).filter(x => x.EumNosaziCodeObjType > 0)]

  /* const getRevisitChildren = (list, parent) => {
    return list
      .filter(x => x.NidNosaziCodeParent === parent.NidNosaziCode)
      .map(x => ({ ...x, children: getChildren(list, x) }))
      .reduce((acc, current) => {
        const isExist = acc.some(item => item.key === current.key)
        if (!isExist) {
          return acc.concat([current])
        } else {
          return acc
        }
      }, [])
      .sort(compareNosaziCodeStrings)
  } */

  // var tmpTree = arg.Result.RevisitList.OrderBy(a => a.District).ThenBy(a=>a.Region).ThenBy(a=>a.Block).ThenBy(a=>a.House).ThenBy(a=>a.Building).ThenBy(a=>a.Apartment).ThenBy(a=>a.Shop).ToList();
  const sortBy = (a, b, field) => {
    if (a[field] < b[field]) return -1
    if (a[field] > b[field]) return 1
    return 1
  }
  const sortPriorities = ['District', 'Region', 'Block', 'House', 'Building', 'Apartment', 'Shop']
  for (let i = 0; i < sortPriorities.length; i++) {
    nodes = nodes.sort((a, b) => sortBy(a, b, sortPriorities[i]))
  }

  // sort by desc
  /*  nodes = nodes.map((x, i) => ({ ...x, priority: i })).sort((a, b) => {
    if (a.priority > b.priority) return -1
    if (a.priority < b.priority) return 1
    return 0
  }) */

  // create tree from child to root
  /* const result = nodes.reduce((node, cur, i, allNodes) => {
    if (i === 0) node = cur
    else {
      node.children = cur
      node = cur
    }
    return node
  })

  console.log(result) */
  return nodes
}

/*

/!**
 * Create Nosazi Tree
 * @param list
 * @returns {*[]}
 *!/
export function createTree (list = []) {
  if (Array.isArray(list)) {
    const root = list
      .filter(x => x.EumNosaziCodeObjType > 0) // Some error found here that object type is zer0
      .reduce((state, x) => x.EumNosaziCodeObjType < state.EumNosaziCodeObjType ? x : state)

    return [ getChildren(list, root) ]
  }
  return getChildrenInObject(list)
}

/!**
 * Convert nosaziCodeObject to nosaziCodeString (nickname)
 * @param nosaziCode
 * @returns {string}
 *!/
export function convertNosaziCodeObjectToString (nosaziCode) {
  return `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}-${nosaziCode.Building}-${nosaziCode.Apartment}-${nosaziCode.Shop}`
}

/!**
 * Convert nosaziCodeString (nickname) to nosaziCodeObject
 * @param nickname
 * @returns {{}}
 *!/
export function convertStringToNosaziCodeObject (nickname = '') {
  const split = nickname.split('-')
  const obj = {}
  SECTIONS.forEach((part, i) => {
    obj[part] = Number(split[i]) || 0
  })
  return obj
}

/!**
 * Compare to NosaziCodeObjects and return proper number
 * @param l
 * @param r
 * @returns {number}
 *!/
export function compareNosaziCodeObjects (l, r) {
  for (const part of SECTIONS) {
    const diff = Number(l[part]) - Number(r[part])
    if (diff !== 0) {
      return diff
    }
  }
  return 0
}

// ***********************************************************************************
// ********************************* Helpers *****************************************

function getChildren (list, code, i = 0) {
  if (!code) {
    return
  }
  // root
  const rootItem = { ...code }
  if (!rootItem.nosaziCodeString) { rootItem.nosaziCodeString = convertNosaziCodeObjectToString(rootItem) }
  rootItem.name = NAMES[rootItem.EumNosaziCodeObjType]
  rootItem.icon = ICONS[rootItem.EumNosaziCodeObjType]
  rootItem.label = rootItem.nosaziCodeString
  rootItem.key = rootItem.nosaziCodeString

  // children
  rootItem.children = list
    .filter(x => rootItem.Id === x.ParentId)
    .reduce((acc, current) => {
      current.nosaziCodeString = convertNosaziCodeObjectToString(current)
      const x = acc.find(item => item.nosaziCodeString === current.nosaziCodeString)
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])
    .map((child, index) => getChildren(list, child, index))
    .sort(compareNosaziCodeObjects)
  return rootItem
}

*/
