# vscode插件

开发[serverless-devs-vscode-plugin](https://github.com/Serverless-Devs/serverless-devs-vscode-plugin)插件小记

## [your-first-extension](https://code.visualstudio.com/api/get-started/your-first-extension)

## [vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples)

## select下拉选择

```ts
const result = await vscode.window.showQuickPick(
  [
    {
      label: 'option1',
      value: 'option1',
    },
    {
      label: 'option2',
      value: 'option2',
    },
  ],
  {
    placeHolder: '请选择',
  },
);
console.log(result.value);
```

![image](https://cdn.jsdelivr.net/gh/xsahxl/blog-images/show-quick-pick.png)

## 右下角弹窗提示

```ts
vscode.window.showInformationMessage('Hello World from start-vscode-plugin!');
vscode.window.showErrorMessage('some error');
```

![image](https://cdn.jsdelivr.net/gh/xsahxl/blog-images/show-message.png)

## 打开某个文件

```ts
const cwd = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath;
const document = await vscode.workspace.openTextDocument(vscode.Uri.file(path.join(cwd as string, 'readme.md')));
await vscode.window.showTextDocument(document, {
  preserveFocus: true,
  preview: true,
});
```

## 弹窗选择本地路径

```ts
const options: vscode.OpenDialogOptions = {
  canSelectFolders: true,
  canSelectFiles: false,
  canSelectMany: false,
  openLabel: '请选择一个路径',
  defaultUri: vscode.Uri.file(os.homedir()),
};
const selectFolderUri = await vscode.window.showOpenDialog(options);
if (selectFolderUri) {
  const { fsPath } = selectFolderUri[0];
  console.log(fsPath);
}
```

![image](https://cdn.jsdelivr.net/gh/xsahxl/blog-images/show-open-dialog.png)

## 打开一个新的项目

```ts
vscode.commands.executeCommand(
  'vscode.openFolder',
  vscode.Uri.file(os.homedir()),
  vscode.workspace.workspaceFolders ? true : false, // 是否在新窗口打开
);
```

## 创建一个新的终端

```ts
const TERMINAL_NAME = '#1';
const terminals = vscode.window.terminals;
for (const item of terminals) {
  if (item.name === TERMINAL_NAME) {
    item.dispose();
  }
}
const terminal = vscode.window.createTerminal(TERMINAL_NAME);
terminal.sendText(newCommand);
terminal.show();
```

## output 窗口显示相关日志

```bash
const outputChannel = vscode.window.createOutputChannel('Package Manage');
# 清除已有日志
outputChannel.clear();
# 打开o utput 窗口
outputChannel.show();
# 追加日志信息
outputChannel.appendLine(`Package ${data.name}@${data.version} is updating...`);
```

## package.json

- explorer/context： 资源管理器右键菜单
- editor/title 编辑器右上角图标
- editor/title/context 编辑器标题右键菜单
- editor/context：编辑器右键菜单
- view/title: 资源管理器某个视图的图标
- view/item/context 资源管理器某个视图中每个item的图标

## webview

- demo

```ts
import { WebviewPanel, ViewColumn, ExtensionContext, Uri } from 'vscode';
import * as _ from 'lodash';
import { getWebviewContent, createWebviewPanel } from '../../utils';
import { WEBVIEW_ICON } from '../../constants';
import * as event from './event';
import i18n from '../../i18n';

class ComponentList {
  public static currentPanel: ComponentList | undefined;
  private readonly _panel: WebviewPanel;

  private constructor(
    panel: WebviewPanel,
    private context: ExtensionContext,
  ) {
    this._panel = panel;
    this._panel.onDidDispose(
      () => {
        ComponentList.currentPanel = undefined;
      },
      null,
      context.subscriptions,
    );
    this._panel.webview.onDidReceiveMessage(message => this.receiveMessage(message, () => this.run()), undefined, context.subscriptions);
  }

  async run() {
    this._panel.webview.html = getWebviewContent(this._panel.webview, this.context.extensionUri, {
      componentName: 'ComponentList',
      componentList: await event.getComponentList(),
    });
    return this;
  }
  public static async render(context: ExtensionContext) {
    if (ComponentList.currentPanel) {
      ComponentList.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      // If a webview panel does not already exist create and show a new one
      const panel = createWebviewPanel('ComponentList', i18n('vscode.panels.component_list.manage_component'));
      panel.iconPath = Uri.parse(WEBVIEW_ICON);
      ComponentList.currentPanel = await new ComponentList(panel, context).run();
    }
  }

  private async receiveMessage(message: any, update: () => Promise<this>) {
    const command = message.command;
    const data = message.data;
    switch (command) {
      case 'deleteComponent':
        await event.deleteComponent(data);
        await update();
        break;
      // Add more switch case statements here as more webview message commands
    }
  }
}

export default ComponentList;
```

- 如何调用

```ts
ComponentList.render(context);
```

- utils

```ts
import * as vscode from 'vscode';

export const getLanguage = () => {
  const language = vscode.env.language;
  // 简体
  if (language === 'zh-cn') return 'zh';
  // 繁体
  if (language === 'zh-tw') return 'zh';
  return 'en';
};

export function getUri(webview: vscode.Webview, extensionUri: vscode.Uri, pathList: string[]) {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}

export function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri, config: Record<string, any> = {}) {
  const { componentName, ...rest } = config;
  // const theme = vscode.workspace.getConfiguration('workbench').get('colorTheme');
  const theme = 'light';
  // The CSS file from the React build output
  const stylesUri = getUri(webview, extensionUri, ['webview-ui', 'build', 'static', 'css', `${theme}.css`]);
  // The JS file from the React build output
  const scriptUri = getUri(webview, extensionUri, ['webview-ui', 'build', 'static', 'js', `${theme}.js`]);

  const SERVERLESS_DEVS_CONFIG = {
    componentName,
    lang: getLanguage(),
    data: rest,
  };

  // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="stylesheet" type="text/css" href="${stylesUri}">
        <script>
          window.SERVERLESS_DEVS_CONFIG = ${JSON.stringify(SERVERLESS_DEVS_CONFIG)}
        </script>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <script nonce="${getNonce()}" src="${scriptUri}"></script>
      </body>
    </html>
  `;
}

export function createWebviewPanel(viewType: string, title: string, viewColumn?: vscode.ViewColumn, options?: vscode.WebviewPanelOptions) {
  // The editor column the panel should be displayed in
  const newViewColumn = viewColumn || vscode.ViewColumn.One;
  const newOptions = {
    // Enable JavaScript in the webview
    enableScripts: true,
    retainContextWhenHidden: true,
    ...options,
  };
  return vscode.window.createWebviewPanel(viewType, title, newViewColumn, newOptions);
}
```

## webview 如何通信

- vscode向react通信

```ts
// vscode
webview.postMessage({
  eventId: 'setDownloadPath',
  data: {
    downloadPath: fsPath,
  },
});
```

```ts
// react
const fn = (event: IEventData) => {
  const { eventId, data } = event.data;
  if (eventId === 'setDownloadPath') {
    setValue('$downloadPath', get(data, 'downloadPath'));
  }
};
// 监听webview发来的消息
window.addEventListener('message', fn);
return () => {
  window.removeEventListener('message', fn);
};
```

- react向vscode通信

```ts
// react
vscode.postMessage({
  command: 'setDownloadPath',
  data: {
    downloadPath: getValue('$downloadPath'),
  },
});
```

```ts
// 参考demo里的 `receiveMessage` 方法
```

## 发布

- https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- https://dev.azure.com
- 获取个人token：https://dev.azure.com/xsahxl/_usersSettings/tokens
