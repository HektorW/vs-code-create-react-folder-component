import { Uri } from 'vscode'
import getComponentFolderAndName from './getComponentFolderAndName'
import createFolderAndFiles, { FileDescription } from './createFolderAndFiles'
import joinUri from './utils/joinUri'
import { renderListTemplate, TemplateData, renderTemplate } from './utils/renderTemplate'
import {
  getExtensionSettings,
  getComponentTemplate,
  TemplateLanguage,
  getIndexTemplate,
  getStyleFileTemplate,
  getStyleFileNameTemplate,
  getStyledComponentTemplate
} from './utils/extensionSettings'
import transformComponentNameToStyleName from './utils/transformComponentNameToStyleName'

export default async function createTypeScriptComponent(
  clickedUri?: Uri,
  withStyle: boolean = false
) {
  const componentFolderAndName = await getComponentFolderAndName(clickedUri)
  if (!componentFolderAndName) {
    return
  }

  const { componentFolderUri, componentName, workspaceFolder } = componentFolderAndName

  const extensionSettings = getExtensionSettings(workspaceFolder)

  const templateLanguage = TemplateLanguage.TypeScript

  const indexTemplate = getIndexTemplate(extensionSettings, templateLanguage)
  const componentTemplate = withStyle
    ? getStyledComponentTemplate(extensionSettings, templateLanguage)
    : getComponentTemplate(extensionSettings, templateLanguage)

  const templateData: TemplateData = {
    $COMPONENT_NAME: componentName,
    $STYLE_COMPONENT_NAME: transformComponentNameToStyleName(componentName)
  }

  const files: FileDescription[] = [
    {
      uri: joinUri(componentFolderUri, `${componentName}.tsx`),
      contents: renderListTemplate(componentTemplate, templateData)
    },
    {
      uri: joinUri(componentFolderUri, 'index.ts'),
      contents: renderListTemplate(indexTemplate, templateData)
    }
  ]

  if (withStyle) {
    const styleFileTemplate = getStyleFileTemplate(extensionSettings, templateLanguage)
    const styleFileNameTemplate = getStyleFileNameTemplate(extensionSettings, templateLanguage)

    files.push({
      uri: joinUri(componentFolderUri, renderTemplate(styleFileNameTemplate, templateData)),
      contents: renderListTemplate(styleFileTemplate, templateData)
    })
  }

  await createFolderAndFiles(componentFolderUri, files)
}
