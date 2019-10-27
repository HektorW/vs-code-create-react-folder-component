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
  return listTemplate.map(templateItem => renderTemplate(templateItem, templateData)).join('\n')
}
