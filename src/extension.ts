import * as vscode from 'vscode'
import createReactFolderComponent from './createReactFolderComponent'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.createReactFolderComponent',
      (clickedUri?: vscode.Uri) => createReactFolderComponent(clickedUri)
    )
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.createReactFolderComponentWithStyle',
      (clickedUri?: vscode.Uri) => createReactFolderComponent(clickedUri, true)
    )
  )
}

export function deactivate() {}
