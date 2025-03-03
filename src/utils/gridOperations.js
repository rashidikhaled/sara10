/**
 * Convert Kendo-grid filter to a MSSQL query
 * @param {Object} filter
 * @returns {String}
 */
export function generateSQLQuery (filter) {
  // No filter specified
  if (!filter) {
    return ''
  }

  const { field, operator, value, filters, logic = '' } = filter

  // Has sub query
  if (Array.isArray(filters)) {
    // Recursive
    const subQuery = filters.map(generateSQLQuery).join(' ' + logic.toUpperCase() + ' ')

    // Parentheses are required
    return `(${subQuery})`.replace('((', '(').replace('))', ')')
  }

  // Generate a short statement
  let query
  switch (operator) {
    case 'startswith':
      query = `${field} LIKE N'${value}%'`
      break
    case 'endswith':
      query = `${field} LIKE N'%${value}'`
      break
    case 'contains':
      query = `${field} LIKE N'%${value}%'`
      break
    case 'doesnotcontain':
      query = `${field} NOT LIKE N'%${value}%'`
      break
    case 'isempty':
      query = `(${field} = '' OR ${field} IS NULL)`
      break
    case 'isnotempty':
      query = `(${field} !== '' AND ${field} IS NOT NULL)`
      break
    case 'eq': // equal to
      query = `${field} = N'${value}'`
      break
    case 'neq': // not equal to
      query = `${field} !== N'${value}'`
      break
    case 'isnull': // is equal to null
      query = `${field} IS NULL`
      break
    case 'isnotnull': // is not equal to null
      query = `${field} IS NOT NULL`
      break
    case 'lt': // less than
      query = `${field} < ${value}'`
      break
    case 'lte': // less than or equal to
      query = `${field} <= ${value}'`
      break
    case 'gt': // greater than
      query = `${field} > ${value}'`
      break
    case 'gte': // greater than or equal to
      query = `${field} >= ${value}'`
      break
  }
  return query
}
