const defaultOptions = { subQuery: false, normalize: true, queryBuilder: undefined, appendOperator: 'AND' }

const textOperators = ['contains', 'notContains', 'startsWith', 'endsWith', 'equals', 'notEqual']

export function customQueryBuilder (field, { filter: { filterType, filter, values, type, other } }, options) {
  switch (field) {
    case 'NidWorkItem':
      if (filterType === 'set') {
        return `(${field} in (${values.join(',')}))`
      } else {
        return createQuery(type, field, filter, false) ?? ''
      }
    case 'BizCode':
      if (filter) {
        filter = getBizCodeFilterValue(filter, false)
      }
      if (filterType === 'set') {
        return getQueryByFilterType({ field, filterType, filter, values, type, ...other, normalize: false })
      } else {
        return createQuery(type, field, filter, false)
      }
  }
  return ''
}

export function getBizCodeFilterValue (code, trail = false) {
  if (code === '0-0-0-0-0-0-0') return null
  let arr = code.split('-')
  while (arr.length > 1 && arr[arr.length - 1] === '0') { arr.pop() }
  let c = arr.join('-')
  if (c.startsWith('0-')) return null
  if (!c.endsWith('-') && arr.length < 7) c = `${c}-`
  return (c)

  // code = code.replace(/$0/g, '')
  // if (code === '0') return null
  // const strLength = code.split('-').length
  // const separator = strLength < 7 ? '-' : ''
  // const appendStr = trail ? new Array(7 - strLength).fill(0).join('-') : ''
  // return (code + separator + appendStr).replace(/--/g, '-')
}

function getRawFilters ({ field, filter, options }) {
  let query = []
  if (!filter) return query
  if (!filter.filterModels || !Array.isArray(filter.filterModels)) return query

  const checkFilterIsValid = item => item && (typeof item === 'object' && typeof item.filterType === 'string')
  const checkNotCondition = item => item && (!item.hasOwnProperty('condition1') && !item.hasOwnProperty('condition2'))
  const checkFilterValue = item => item && (item.values || item.filter)
  let filters = filter.filterModels
  // check filters is valid
  for (const cb of [checkFilterIsValid, checkNotCondition, checkFilterValue]) {
    filters = filters.filter(cb)
  }

  const operator = filter.operator
  if (!filters.length) return query
  for (const item of filters) {
    let strQ = ''
    if (typeof options.queryBuilder === 'function') {
      strQ = options.queryBuilder(field, {
        filter: {
          filterType: item.filterType,
          filter: item.filter,
          values: item.values,
          type: item.type,
          operator
        }
      }, options)
    } else {
      strQ = getQueryByFilterType({
        filterType: item.filterType,
        filter: item.filter,
        values: item.values,
        type: item.type,
        field,
        operator
      })
    }
    if (strQ) {
      query.push(strQ)
    }
  }
  return query
}

export function filterModelToSqlQuery (field, filter, options) {
  options = { ...defaultOptions, ...options || {} }

  filter.operator = filter.operator ?? 'AND'
  const { filterModels, operator } = filter
  const query = getRawFilters({ field, filter, options })

  const conditionFilters = filterModels.filter(Boolean).filter(item => item.hasOwnProperty('condition1') || item.hasOwnProperty('condition2'))
  if (conditionFilters.length) {
    conditionFilters.forEach(filter => {
      query.push(filterModelToSqlQuery(field, {
        filterModels: [filter.condition1, filter.condition2], operator: filter.operator
      }, { ...options, subQuery: true }))
    })
  }

  const strQuery = query.filter(Boolean).filter(str => str && str.trim().length > 0).join(` ${operator} `)
  // console.log('strQuery', strQuery)

  if (!strQuery || strQuery.trim().length === 0) return ''
  if (options.subQuery) return `(${strQuery})`
  return ` ${options.appendOperator} (${strQuery})`
}

function getQueryByFilterType ({ field, filterType, filter, values, type, normalize = true }) {
  if (filterType === 'set') {
    let valueList = values.reduce((out, term) => {
      if (!Array.isArray(out)) out = []
      if (normalize) {
        out.push(`${term}`.convertToPersian())
        out.push(`${term}`.convertToArabic())
      } else {
        out.push(term)
      }
      return out
    }, [])

    const separator = `',N'`
    if (valueList.length) {
      return `(${field} in (N'${valueList.join(separator)}')) or (${field} in ('${valueList.join(`','`)}'))`
    } else {
      return ''
    }
  } else {
    return createQuery(type, field, filter, normalize)
  }
}

export function createQuery (operator, filterKey, filterValue, normalize = true) {
  let query = ''
  switch (operator) {
    case 'notContains':
      query = `${filterKey} NOT LIKE N'%#term#%'`
      break
    case 'equals':
      query = `${filterKey} = N'#term#'`
      break
    case 'notEqual':
      query = `${filterKey} <> N'#term#'`
      break

    case 'startsWith':
      query = `${filterKey} LIKE N'#term#%'`
      break

    case 'endsWith':
      query = `${filterKey} LIKE N'%#term#'`
      break

    case 'lessThan':
      query = `${filterKey} < #term#`
      break

    case 'lessThanOrEqual':
      query = `${filterKey} <= #term#`
      break

    case 'greaterThan':
      query = `${filterKey} > #term#`
      break

    case 'greaterThanOrEqual':
      query = `${filterKey} >= #term#`
      break

    case 'inRange':
      if (typeof filterValue !== 'object') return ''
      query = `${filterKey} >= '${filterValue.from}' AND ${filterKey} <= '${filterValue.to}'`
      break

    case 'blank':
      query = `${filterKey} IS NULL`
      break

    case 'notBlank':
      query = `${filterKey} IS NOT NULL`
      break

    default:
      query = `${filterKey} LIKE N'%#term#%'`
      break
  }

  if (!normalize) return query.replace(/#term#/g, filterValue)
  return textOperators.includes(operator) ? normalizeFilter(query, filterValue) : query.replace(/#term#/g, filterValue)
}

export const normalizeFilter = (strQuery, term) => {
  if (!strQuery) return ''
  term = `${term}`
  return `(${strQuery.replace(/#term#/g, term.convertToArabic())} OR ${strQuery.replace(/#term#/g, term.convertToPersian())})`
}
