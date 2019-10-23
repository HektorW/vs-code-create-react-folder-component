export default function transformComponentNameToStyleName(componentName: string) {
  const uppercaseRegex = /[A-Z]+/g

  return componentName.replace(uppercaseRegex, (letters, offset, entireString) => {
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
