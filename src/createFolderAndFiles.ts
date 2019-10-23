import { Uri, workspace, FileType, window } from 'vscode'
import { basename } from 'path'

export interface FileDescription {
  uri: Uri
  contents: string
}

export default async function createFolderAndFiles(folderUri: Uri, files: FileDescription[]) {
  try {
    const folderStats = await workspace.fs.stat(folderUri)

    if (folderStats.type & FileType.Directory) {
      const existingFolderContens = await workspace.fs.readDirectory(folderUri)
      if (existingFolderContens.length !== 0) {
        const folderName = basename(folderUri.path)
        window.showWarningMessage(
          `A folder with the name "${folderName}" already exists and is not empty.
          I won't create the component here because it might unexpectedly overwrite something.`
        )
        return
      }
    }
  } catch (_ /* ignore error */) {}

  await workspace.fs.createDirectory(folderUri)

  await Promise.all(
    files.map(fileDescription =>
      workspace.fs.writeFile(fileDescription.uri, Buffer.from(fileDescription.contents, 'utf8'))
    )
  )
}
