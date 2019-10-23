import { Uri } from 'vscode'
import getComponentFolderAndName from './getComponentFolderAndName'
import createFolderAndFiles, { FileDescription } from './createFolderAndFiles'
import joinUri from './utils/joinUri'
import renderTemplate from './utils/renderTemplate'
import transformComponentNameToStyleName from './utils/transformComponentNameToStyleName'

const indexFileTemplate = `export { default } from './{{componentName}}'`

const styleFileTemplate = `.{{styleComponentName}} {}`

const componentFileTemplate = `import React from 'react'
import './{{styleComponentName}}.scss'

interface {{componentName}}Props {}

export default function {{componentName}}({}: {{componentName}}Props) {

}`

export default async function createTypeScriptComponentWithStyle(clickedUri?: Uri) {
  const componentFolderAndName = await getComponentFolderAndName(clickedUri)
  if (!componentFolderAndName) {
    return
  }

  const { componentFolderUri, componentName } = componentFolderAndName

  const styleComponentName = transformComponentNameToStyleName(componentName)

  const files: FileDescription[] = [
    {
      uri: joinUri(componentFolderUri, `${componentName}.tsx`),
      contents: renderTemplate(componentFileTemplate, { componentName, styleComponentName })
    },
    {
      uri: joinUri(componentFolderUri, 'index.ts'),
      contents: renderTemplate(indexFileTemplate, { componentName })
    },
    {
      uri: joinUri(componentFolderUri, `${styleComponentName}.scss`),
      contents: renderTemplate(styleFileTemplate, { styleComponentName })
    }
  ]

  await createFolderAndFiles(componentFolderUri, files)
}
