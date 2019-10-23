import { WorkspaceFolder, Uri } from 'vscode'
import showSelectWorkspaceFolder from './showSelectWorkspaceFolder'
import showSelectFolderOrChild from './showSelectFolderOrChild'

export default async function showSelectComponentParentFolder(
  workspaceFolders: WorkspaceFolder[]
): Promise<Uri | null> {
  const selectedWorkspaceFolder =
    workspaceFolders.length === 1
      ? workspaceFolders[0].uri
      : await showSelectWorkspaceFolder(workspaceFolders)

  if (!selectedWorkspaceFolder) {
    return null
  }

  return showSelectFolderOrChild(selectedWorkspaceFolder)
}
