import { WorkspaceFolder, window } from 'vscode'
import {
  getExtensionSettings,
  getDefaultTemplateLanguage,
  TemplateLanguage
} from './utils/extensionSettings'

export default async function showSelectLanguageTemplate(
  workspaceFolder?: WorkspaceFolder
): Promise<TemplateLanguage | null> {
  const extensionSettings = getExtensionSettings(workspaceFolder)
  const defaultLanguage = getDefaultTemplateLanguage(extensionSettings)

  if (defaultLanguage !== null) {
    return defaultLanguage
  }

  const typeScriptOption = 'TypeScript'
  const javaScriptOption = 'JavaScript'

  const selectedChoice = await window.showQuickPick([typeScriptOption, javaScriptOption])

  if (selectedChoice === typeScriptOption) return TemplateLanguage.TypeScript
  if (selectedChoice === javaScriptOption) return TemplateLanguage.JavaScript

  return null
}
