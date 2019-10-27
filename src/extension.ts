import * as vscode from 'vscode'
import createReactFolderComponent from './createReactFolderComponent'
import createReactFolderComponentWithStyle from './createReactFolderComponentWithStyle'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.createReactFolderComponent',
      createReactFolderComponent
    )
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.createReactFolderComponentWithStyle',
      createReactFolderComponentWithStyle
    )
  )
}

export function deactivate() {}
