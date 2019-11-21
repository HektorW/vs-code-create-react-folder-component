import { Uri, workspace, QuickPickItem, window, FileType } from 'vscode'
import { basename, join } from 'path'
import sortAlphabetically from './utils/sortAlphabetically'
import getSubFolders from './getSubFolders'

export default async function showSelectFolderOrChild(
  currentFolder: Uri,
  parentFolders: Uri[] = []
): Promise<Uri | null> {
  const workspaceFolder = parentFolders[0] || currentFolder

  const subFolders = await getSubFolders(workspaceFolder, currentFolder)
  const subFolderOptions = subFolders.sort(sortAlphabetically).map(folderUri => ({
    label: `${basename(folderUri.path)}`,
    uri: folderUri
  }))

  const currentFolderName = basename(currentFolder.path)
  const selectCurrentFolderOption: QuickPickItem = {
    label: `Select this folder (${currentFolderName}/)`
  }

  const closestParentFolder: Uri | undefined = parentFolders[parentFolders.length - 1]
  const selectParentFolderOption: QuickPickItem | null = closestParentFolder
    ? {
        label: `Go back to parent folder (${basename(closestParentFolder.path)}/)`
      }
    : null

  const options: QuickPickItem[] = [selectCurrentFolderOption]

  if (selectParentFolderOption) {
    options.push(selectParentFolderOption)
  }

  options.push(...subFolderOptions)

  const selectedOption = await window.showQuickPick(options, {
    placeHolder: 'Select a folder'
  })
  if (!selectedOption) {
    return null
  }

  if (selectedOption === selectCurrentFolderOption) {
    return currentFolder
  }

  if (selectedOption === selectParentFolderOption) {
    return showSelectFolderOrChild(closestParentFolder, parentFolders.slice(0, -1))
  }

  const childFolderUri = currentFolder.with({
    path: join(currentFolder.path, basename(selectedOption.label))
  })

  return showSelectFolderOrChild(childFolderUri, [...parentFolders, currentFolder])
}
