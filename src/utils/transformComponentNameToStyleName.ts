const numberRegex = /\w([0-9]+)/g
const uppercaseRegex = /[A-Z]+/g

export default function transformComponentNameToStyleName(componentName: string) {
  const transformedNumbers = componentName.replace(numberRegex, (match, numbers) => {
    return match.replace(numbers, `-${numbers}`)
  })

  return transformedNumbers.replace(uppercaseRegex, (letters, offset, entireString) => {
    if (offset === 0) {
      return transformUppercaseLetters(letters)
    }

    const isAtEnd = offset + letters.length === entireString.length
    if (isAtEnd) {
      return `-${letters.toLowerCase()}`
    }

    return `-${transformUppercaseLetters(letters)}`
  })
}

function transformUppercaseLetters(letters: string) {
  const lowerCased = letters.toLowerCase()
  if (lowerCased.length === 1) return lowerCased
  return lowerCased.slice(0, -1) + '-' + lowerCased[lowerCased.length - 1]
}
