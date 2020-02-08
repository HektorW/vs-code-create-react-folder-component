import { getWorkspaceEOL } from './workspaceSettings'

const { keys } = Object

export interface TemplateData {
  [key: string]: string
}

export function renderTemplate(template: string, templateData: TemplateData) {
  return keys(templateData).reduce(
    (renderedTemplate, dataKey) =>
      renderedTemplate.replace(new RegExp(dataKey.replace('$', '\\$'), 'g'), templateData[dataKey]),
    template
  )
}

export function renderListTemplate(listTemplate: string[], templateData: TemplateData) {
  const eol = getWorkspaceEOL()
  return listTemplate.map(templateItem => renderTemplate(templateItem, templateData)).join(eol)
}
