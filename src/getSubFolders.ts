import { Uri, workspace, FileType } from 'vscode'
import * as minimatch from 'minimatch'
import joinUri from './utils/joinUri'

interface ExcludeFilesSetting {
  [globPattern: string]: boolean
}

export default async function getSubFolders(
  workspaceFolder: Uri,
  currentFolder: Uri
): Promise<Uri[]> {
  const folderChilds = await workspace.fs.readDirectory(currentFolder)

  const subFolderUris = folderChilds
    .filter(([_, fileType]) => fileType & FileType.Directory)
    .map(([folderName]) => joinUri(currentFolder, folderName))

  const excludedFilesSettings = workspace
    .getConfiguration(undefined, currentFolder)
    .get('files.exclude') as ExcludeFilesSetting

  const activeExcludedFoldes = Object.keys(excludedFilesSettings).filter(
    globPattern => excludedFilesSettings[globPattern] === true
  )

  const filteredSubFolderUris = subFolderUris.filter(subFolderUri => {
    let relativeWorkspaceFolderPath = subFolderUri.path.replace(workspaceFolder.path, '')
    if (relativeWorkspaceFolderPath[0] === '/') {
      relativeWorkspaceFolderPath = relativeWorkspaceFolderPath.substr(1)
    }
    if (relativeWorkspaceFolderPath[relativeWorkspaceFolderPath.length - 1] !== '/') {
      relativeWorkspaceFolderPath += '/'
    }

    const shouldExclude = activeExcludedFoldes.some(excludedGlobPattern =>
      minimatch(relativeWorkspaceFolderPath, excludedGlobPattern, { matchBase: true })
    )

    return !shouldExclude
  })

  return filteredSubFolderUris
}
