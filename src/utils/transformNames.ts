export function getCleanedInputName(inputName: string): string {
  return inputName.replace(/\s/g, '')
}

export function getCamelCaseName(name: string): string {
  const nameParts = splitNameIntoParts(name)
  const firstPart = nameParts[0]
  const restOfName = nameParts.slice(1).join('')
  return firstPart.toLowerCase() + restOfName
}

export function getPascalCaseName(name: string): string {
  const firstLetter = name[0]
  const restLetters = name.substr(1)
  return firstLetter.toUpperCase() + restLetters
}

export function getSnakeCaseName(name: string): string {
  const nameParts = splitNameIntoParts(name)
  return nameParts.map((namePart) => namePart.toLowerCase()).join('_')
}

export function getKebabCaseName(name: string): string {
  const nameParts = splitNameIntoParts(name)
  return nameParts.map((namePart) => namePart.toLowerCase()).join('-')
}

/**
 * Will split parts by uppercase and numbers.
 * Multiple uppercase letters and numbers in sequence will be kept together.
 */
export function splitNameIntoParts(name: string): string[] {
  const splitRegex = /(?:([A-Z]+)|([0-9]+))/g
  const parts: string[] = []

  let match
  let previousIndex = 0
  while ((match = splitRegex.exec(name)) !== null) {
    const [_, uppercaseMatch, numberMatch] = match
    const matchIndex = match.index!

    if (matchIndex > previousIndex) {
      const previousPartUntilThisMatch = name.substring(previousIndex, matchIndex)
      parts.push(previousPartUntilThisMatch)
    }

    if (uppercaseMatch) {
      if (uppercaseMatch.length === 1) {
        previousIndex = matchIndex
      } else {
        const isEndOfName = matchIndex + uppercaseMatch.length === name.length
        const matchPartLength = isEndOfName ? uppercaseMatch.length : uppercaseMatch.length - 1
        const part = uppercaseMatch.substr(0, matchPartLength)
        parts.push(part)
        previousIndex = matchIndex + matchPartLength
      }
    }

    if (numberMatch) {
      parts.push(numberMatch)
      previousIndex = matchIndex + numberMatch.length
    }
  }

  if (previousIndex < name.length) {
    parts.push(name.substr(previousIndex))
  }

  return parts
}
