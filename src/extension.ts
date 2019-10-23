import * as vscode from 'vscode'
import createTypeScriptComponent from './createTypeScriptComponent'
import createTypeScriptComponentWithStyle from './createTypeScriptComponentWithStyle'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.createTypeScriptComponent',
      createTypeScriptComponent
    )
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.createTypeScriptComponentWithStyle',
      createTypeScriptComponentWithStyle
    )
  )
}

export function deactivate() {}
