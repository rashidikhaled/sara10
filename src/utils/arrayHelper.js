export function merge (objects) {
  const out = {}

  for (let i = 0; i < objects.length; i++) {
    for (let p in objects[i]) {
      out[p] = objects[i][p]
    }
  }

  return out
}

export function flattenObject (obj, name, stem) {
  let out = {}
  const newStem = (typeof stem !== 'undefined' && stem !== '') ? stem + '_' + name : name

  if (typeof obj !== 'object' || Array.isArray(obj)) {
    out[newStem] = obj
    return out
  }

  for (let p in obj) {
    const prop = flattenObject(obj[p], p, newStem)
    out = merge([out, prop])
  }
  return out
}
