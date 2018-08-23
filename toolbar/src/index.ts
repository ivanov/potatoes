import {
  IDisposable, DisposableDelegate
} from '@phosphor/disposable';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ToolbarButton
} from '@jupyterlab/apputils';

import {
  DocumentRegistry
} from '@jupyterlab/docregistry';

import {
  NotebookActions, NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';

/**
 * Initialization data for the toolbar_launcher_button extension.
 */
const extension: JupyterLabPlugin<void> = {
  activate,
  id: 'toolbar_launcher_button',
  autoStart: true
};

/**
 * A notebook widget extension that adds a button to the toolbar.
 */
export
class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  /**
   * Create a new extension object.
   */
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    let callback = () => {
      NotebookActions.clearAllOutputs(panel.content);
    };
    let button = new ToolbarButton({
      className: 'myButton',
      iconClassName: 'jp-MoreHorizIcon jp-Icon jp-Icon-16 jp-ToolbarButtonComponent-icon',
      onClick: callback,
      tooltip: 'Clear All Output'
    });

    panel.toolbar.insertItem(0, 'newLauncher', button);
    return new DisposableDelegate(() => {
      button.dispose();
    });
  }
}

/**
 * Activate the extension.
 */
function activate(app: JupyterLab) {
  console.log('JupyterLab extension toolbar_launcher_button is activated!');
  app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
};

export default extension;
