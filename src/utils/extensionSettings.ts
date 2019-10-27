import { workspace, WorkspaceFolder, WorkspaceConfiguration } from 'vscode'

export enum TemplateLanguage {
  TypeScript = 'TypeScript',
  JavaScript = 'JavaScript'
}

export function getExtensionSettings(workspaceFolder?: WorkspaceFolder) {
  return workspace.getConfiguration(
    'createreactfoldercomponent',
    workspaceFolder ? workspaceFolder.uri : null
  )
}

export function getComponentTemplate(
  extensionSettings: WorkspaceConfiguration,
  language: TemplateLanguage
) {
  let template: string[] | undefined
  switch (language) {
    case TemplateLanguage.TypeScript:
      template = extensionSettings.get<string[]>('typeScriptComponentTemplate')
      break
    case TemplateLanguage.JavaScript:
      template = extensionSettings.get<string[]>('javaScriptComponentTemplate')
      break
  }
  return template || ['invalid_setting']
}

export function getStyledComponentTemplate(
  extensionSettings: WorkspaceConfiguration,
  language: TemplateLanguage
) {
  let template: string[] | undefined
  switch (language) {
    case TemplateLanguage.TypeScript:
      template = extensionSettings.get<string[]>('typeScriptStyledComponentTemplate')
      break
    case TemplateLanguage.JavaScript:
      template = extensionSettings.get<string[]>('javaScriptStyledComponentTemplate')
      break
  }
  return template || ['invalid_setting']
}

export function getIndexTemplate(
  extensionSettings: WorkspaceConfiguration,
  language: TemplateLanguage
) {
  let template: string[] | undefined
  switch (language) {
    case TemplateLanguage.TypeScript:
      template = extensionSettings.get<string[]>('typeScriptIndexTemplate')
      break
    case TemplateLanguage.JavaScript:
      template = extensionSettings.get<string[]>('javaScriptIndexTemplate')
      break
  }
  return template || ['invalid_setting']
}

export function getStyleFileTemplate(
  extensionSettings: WorkspaceConfiguration,
  language: TemplateLanguage
) {
  let template: string[] | undefined
  switch (language) {
    case TemplateLanguage.TypeScript:
      template = extensionSettings.get<string[]>('typeScriptStyleTemplate')
      break
    case TemplateLanguage.JavaScript:
      template = extensionSettings.get<string[]>('javaScriptStyleTemplate')
      break
  }
  return template || ['invalid_setting']
}

export function getStyleFileNameTemplate(
  extensionSettings: WorkspaceConfiguration,
  language: TemplateLanguage
) {
  let template: string | undefined
  switch (language) {
    case TemplateLanguage.TypeScript:
      template = extensionSettings.get<string>('typeScriptStyleFileNameTemplate')
      break
    case TemplateLanguage.JavaScript:
      template = extensionSettings.get<string>('javaScriptStyleFileNameTemplate')
      break
  }
  return template || 'invalid_setting'
}

export function getDefaultTemplateLanguage(
  extensionSettings: WorkspaceConfiguration
): TemplateLanguage | null {
  const settingChoice = extensionSettings.get<string>('templateLanguage')
  if (settingChoice) {
    const lowerCasedChoice = settingChoice.toLowerCase()
    if (lowerCasedChoice === 'typescript') return TemplateLanguage.TypeScript
    if (lowerCasedChoice === 'javascript') return TemplateLanguage.JavaScript
  }
  return null
}
