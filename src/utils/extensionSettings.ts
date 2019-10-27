import { workspace, WorkspaceFolder, WorkspaceConfiguration } from 'vscode'

export enum TemplateLanguage {
  TypeScript = 'TypeScript'
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
  }
  return template || 'invalid_setting'
}
