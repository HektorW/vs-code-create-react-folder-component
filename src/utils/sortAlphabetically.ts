import { Uri } from 'vscode'
import { basename } from 'path'

export default function sortAlphabetically(uriA: Uri, uriB: Uri) {
  const basenameA = basename(uriA.path)
  const basenameB = basename(uriB.path)

  const lowerCasedA = basenameA.toLowerCase()
  const lowerCasedB = basenameB.toLowerCase()

  if (lowerCasedA > lowerCasedB) return 1
  if (lowerCasedA < lowerCasedB) return -1
  return basenameA > basenameB ? 1 : -1
}
