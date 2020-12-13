import { Uri, workspace, window, WorkspaceFolder } from 'vscode'
import { join } from 'path'
import showSelectComponentParentFolder from './showSelectComponentParentFolder'
import { getCleanedInputName } from './utils/transformNames'

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
    ? parentFolder.path.replace(workspaceFolder.uri.path, '')
    : parentFolder.path

  const componentName = await window.showInputBox({
    placeHolder: 'ComponentName',
    prompt: `Component will be created in ${promptFolder}`,
  })

  if (!componentName) {
    return null
  }

  const cleanedComponentName = getCleanedInputName(componentName)

  const componentFolderPath = join(parentFolder.path, cleanedComponentName)
  const componentFolderUri = Uri.file(componentFolderPath)

  return {
    componentFolderUri,
    componentName: cleanedComponentName,
    workspaceFolder,
  }
}
