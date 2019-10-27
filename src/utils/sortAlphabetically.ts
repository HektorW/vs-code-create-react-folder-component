export default function sortAlphabetically(list: string[]) {
  return list.sort((itemA, itemB) => {
    const lowerCasedA = itemA.toLowerCase()
    const lowerCasedB = itemB.toLowerCase()

    if (lowerCasedA > lowerCasedB) return 1
    if (lowerCasedA < lowerCasedB) return -1
    return itemA > itemB ? 1 : -1
  })
}
