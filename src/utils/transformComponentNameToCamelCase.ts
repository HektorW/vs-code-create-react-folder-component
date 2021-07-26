export default function transformComponentNameToCamelCase(componentName: string) {
  let nameAsArray = Array.from(componentName)
  nameAsArray[0] = nameAsArray[0].toLowerCase()
  return nameAsArray.join('')
}
