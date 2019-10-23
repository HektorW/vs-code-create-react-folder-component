import { Uri } from 'vscode'
import { join } from 'path'

export default function joinUri(rootUri: Uri, ...joinPaths: string[]) {
  return rootUri.with({
    path: join(rootUri.fsPath, ...joinPaths)
  })
}
