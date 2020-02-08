import { EOL } from 'os'
import { workspace } from 'vscode'

type EOLTypes = 'auto' | '\n' | '\r\n'

export function getWorkspaceEOL() {
  const selectedEol = workspace.getConfiguration('files').get<EOLTypes>('eol')

  if (selectedEol === 'auto') {
    return EOL
  }

  return selectedEol
}
