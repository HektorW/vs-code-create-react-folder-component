import { Uri, workspace, QuickPickItem, window, FileType } from 'vscode'
import { basename, join } from 'path'
import sortAlphabetically from './utils/sortAlphabetically'

export default async function showSelectFolderOrChild(
  currentFolder: Uri,
  parentFolders: Uri[] = []
): Promise<Uri | null> {
  const currentFolderName = basename(currentFolder.path)

  const currentFolderChilds = await workspace.fs.readDirectory(currentFolder)
  const currentFolderChildFolders = currentFolderChilds
    .filter(child => child[1] & FileType.Directory)
    .map(([folderName]) => folderName)

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

  workspace.getConfiguration()

  options.push(
    ...sortAlphabetically(currentFolderChildFolders).map(folderName => ({
      label: `${folderName}/`
    }))
  )

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
    path: join(currentFolder.fsPath, basename(selectedOption.label))
  })

  return showSelectFolderOrChild(childFolderUri, [...parentFolders, currentFolder])
}
