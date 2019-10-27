import { Uri, workspace, window, WorkspaceFolder } from 'vscode'
import { join } from 'path'
import showSelectComponentParentFolder from './showSelectComponentParentFolder'

export default async function getComponentFolderAndName(
  clickedUri?: Uri
): Promise<{
  componentFolderUri: Uri
  componentName: string
  workspaceFolder?: WorkspaceFolder
} | null> {
  if (!workspace.workspaceFolders) {
    window.showWarningMessage('This extension is only available in a workspace.')
    return null
  }

  const parentFolder = clickedUri
    ? clickedUri
    : await showSelectComponentParentFolder(workspace.workspaceFolders)

  if (!parentFolder) {
    return null
  }

  const workspaceFolder = workspace.getWorkspaceFolder(parentFolder)

  const promptFolder = workspaceFolder
    ? parentFolder.fsPath.replace(workspaceFolder.uri.fsPath, '')
    : parentFolder.fsPath

  const componentName = await window.showInputBox({
    placeHolder: 'ComponentName',
    prompt: `Component will be created in ${promptFolder}`
  })

  if (!componentName) {
    return null
  }

  const componentFolderPath = join(parentFolder.fsPath, componentName)
  const componentFolderUri = parentFolder.with({ path: componentFolderPath })

  return { componentFolderUri, componentName, workspaceFolder }
}
