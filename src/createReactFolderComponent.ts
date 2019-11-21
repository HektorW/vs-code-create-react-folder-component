import { Uri } from 'vscode'
import { join } from 'path'
import getComponentFolderAndName from './getComponentFolderAndName'
import createFolderAndFiles, { FileDescription } from './createFolderAndFiles'
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
import showSelectLanguageTemplate from './showSelectLanguageTemplate'

export default async function createTypeScriptComponent(
  clickedUri?: Uri,
  withStyle: boolean = false
) {
  const componentFolderAndName = await getComponentFolderAndName(clickedUri)
  if (!componentFolderAndName) {
    return
  }

  const { componentFolderUri, componentName, workspaceFolder } = componentFolderAndName

  const templateLanguage = await showSelectLanguageTemplate(workspaceFolder)
  if (!templateLanguage) {
    return
  }

  const extensionSettings = getExtensionSettings(workspaceFolder)

  const indexTemplate = getIndexTemplate(extensionSettings, templateLanguage)
  const componentTemplate = withStyle
    ? getStyledComponentTemplate(extensionSettings, templateLanguage)
    : getComponentTemplate(extensionSettings, templateLanguage)

  const templateData: TemplateData = {
    $COMPONENT_NAME: componentName
  }

  if (withStyle) {
    templateData.$STYLE_COMPONENT_NAME = transformComponentNameToStyleName(componentName)
    templateData.$STYLE_COMPONENT_FILENAME = renderTemplate(
      getStyleFileNameTemplate(extensionSettings, templateLanguage),
      templateData
    )
  }

  const files: FileDescription[] = [
    {
      uri: Uri.file(
        join(componentFolderUri.path, `${componentName}${componentFileExtension(templateLanguage)}`)
      ),
      contents: renderListTemplate(componentTemplate, templateData)
    },
    {
      uri: Uri.file(join(componentFolderUri.path, `index${indexFileExtension(templateLanguage)}`)),
      contents: renderListTemplate(indexTemplate, templateData)
    }
  ]

  if (withStyle) {
    const styleFileTemplate = getStyleFileTemplate(extensionSettings, templateLanguage)

    files.push({
      uri: Uri.file(join(componentFolderUri.path, templateData.$STYLE_COMPONENT_FILENAME)),
      contents: renderListTemplate(styleFileTemplate, templateData)
    })
  }

  await createFolderAndFiles(componentFolderUri, files)
}

function componentFileExtension(language: TemplateLanguage): string {
  switch (language) {
    case TemplateLanguage.TypeScript:
      return '.tsx'
    case TemplateLanguage.JavaScript:
      return '.js'
  }
}

function indexFileExtension(language: TemplateLanguage): string {
  switch (language) {
    case TemplateLanguage.TypeScript:
      return '.ts'
    case TemplateLanguage.JavaScript:
      return '.js'
  }
}
