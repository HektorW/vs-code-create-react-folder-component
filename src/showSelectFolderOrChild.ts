import { Uri, workspace, QuickPickItem, window, FileType } from 'vscode'
import { basename, join } from 'path'

export default async function showSelectFolderOrChild(
  currentFolder: Uri,
  parentFolders: Uri[] = []
): Promise<Uri | null> {
  const currentFolderName = basename(currentFolder.path)

  const currentFolderChilds = await workspace.fs.readDirectory(currentFolder)
  const currentFolderChildDirectories = currentFolderChilds.filter(
    child => child[1] & FileType.Directory
  )

  const selectCurrentFolderOption: QuickPickItem = {
    label: `Select this folder (${currentFolderName}/)`
  }

  const closestParentFolder: Uri | undefined = parentFolders[parentFolders.length - 1]
  const selectParentFolderOption: QuickPickItem | null = closestParentFolder
    ? {
        label: `../ (${basename(closestParentFolder.path)}/)`
      }
    : null

  const options: QuickPickItem[] = [selectCurrentFolderOption]

  if (selectParentFolderOption) {
    options.push(selectParentFolderOption)
  }

  options.push(
    ...currentFolderChildDirectories.map(child => ({
      label: `${child[0]}/`
    }))
  )

  const selectedOption = await window.showQuickPick(options, {
    placeHolder: 'Selection'
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
