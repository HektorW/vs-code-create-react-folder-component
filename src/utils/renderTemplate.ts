const { keys } = Object

export default function renderTemplate(template: string, templateData: { [key: string]: string }) {
  return keys(templateData).reduce(
    (renderedTemplate, dataKey) =>
      renderedTemplate.replace(new RegExp(`{{${dataKey}}}`, 'g'), templateData[dataKey]),
    template
  )
}
