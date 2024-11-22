export const transformFilter = (filter: string[] | number[]) => {
  if(filter.length === 1) {
    return filter.join('')
  }
  if (filter.length > 1) {
    return filter.join(',')
  }
  return null

}
