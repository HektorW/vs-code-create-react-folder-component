import { Uri } from 'vscode'
import getComponentFolderAndName from './getComponentFolderAndName'
import createFolderAndFiles, { FileDescription } from './createFolderAndFiles'
import joinUri from './utils/joinUri'
import renderTemplate from './utils/renderTemplate'

const indexFileTemplate = `export { default } from './{{ComponentName}}'`

const componentFileTemplate = `import React from 'react'

interface {{ComponentName}}Props {}

export default function {{ComponentName}}({}: {{ComponentName}}Props) {

}`

export default async function createTypeScriptComponent(clickedUri?: Uri) {
  const componentFolderAndName = await getComponentFolderAndName(clickedUri)
  if (!componentFolderAndName) {
    return
  }

  const { componentFolderUri, componentName } = componentFolderAndName

  const files: FileDescription[] = [
    {
      uri: joinUri(componentFolderUri, `${componentName}.tsx`),
      contents: renderTemplate(componentFileTemplate, { componentName })
    },
    {
      uri: joinUri(componentFolderUri, 'index.ts'),
      contents: renderTemplate(indexFileTemplate, { componentName })
    }
  ]

  await createFolderAndFiles(componentFolderUri, files)
}
