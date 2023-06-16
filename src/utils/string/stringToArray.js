/**
 * Returns an array. Splits a string with a given separator.
 * @param {string} value - The string to split
 * @param {string} separator - The separator
 */
export const formatStringToArray = (value, separator = ',') => {
  if (!value) return []
  return (value || '').split(separator)
}
