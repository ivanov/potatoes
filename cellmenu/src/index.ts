import {
 JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

// explicitly import menu interface
import {
  IMainMenu, JupyterLabMenu
} from '@jupyterlab/mainmenu';

import {
  Menu
} from '@phosphor/widgets';

import '../style/index.css';


/**
 * Extension that adds a new keybinding for the existing Launcher 'create' command
 */
 // you can also use Settings >> Advanced Settings >> Keyboard Shortcuts to set
 // and test User Overrides
 // System Defaults is a good reference for selector options
 // and keys syntax as well (Cntrl versus Cntrl)
 // the User Overrides input area will also validate your bindings

 // jupyterlab-vim is a good example of a key binding extension that configures 
 // vim notebook cell bindings for JupyterLab
 // https://github.com/jwkvam/jupyterlab-vim
const extension: JupyterLabPlugin<void> = {
  id: 'jlab_cell_menu',
  autoStart: true,
  activate: (app: JupyterLab,
    mainMenu: IMainMenu) => {
    console.log('JupyterLab extension jlab_cell_menu is activated!');

    const { commands } = app;
    let cellMenu = new JupyterLabMenu({ commands });
    cellMenu.menu.title.label = 'Cell';

    let cellTypeMenu = new Menu({ commands }); // sub-menu for published projects
    cellTypeMenu.title.label = 'Cell Type';
    cellTypeMenu.addItem({ command: 'notebook:change-cell-to-raw' });
    cellTypeMenu.addItem({ command: 'notebook:change-cell-to-markdown' });
    cellTypeMenu.addItem({ command: 'notebook:change-cell-to-code' });

    let currentOutputMenu = new Menu({ commands }); // sub-menu for published projects
    currentOutputMenu.title.label = 'Current Output';
    currentOutputMenu.addItem({ command: 'notebook:hide-cell-outputs' });
    currentOutputMenu.addItem({ command: 'notebook:show-cell-outputs' });
    currentOutputMenu.addItem({ command: 'notebook:clear-cell-output' });

    let allOutputMenu = new Menu({ commands }); // sub-menu for published projects
    allOutputMenu.title.label = 'All Output';
    allOutputMenu.addItem({ command: 'notebook:hide-all-cell-outputs' });
    allOutputMenu.addItem({ command: 'notebook:show-all-cell-outputs' });
    allOutputMenu.addItem({ command: 'notebook:enable-output-scrolling' });
    allOutputMenu.addItem({ command: 'notebook:disable-output-scrolling' });
    allOutputMenu.addItem({ command: 'notebook:clear-all-cell-outputs' });

    // rank -1 can be used to move a new submenu to the left-most position
    cellMenu.addGroup([
      { command: 'runmenu:run' },
      { command: 'notebook:run-cell' },
      { command: 'notebook:run-cell-and-insert-below' },
      { command: 'notebook:run-all-above' },
      { command: 'notebook:run-all-below' },
      { command: 'runmenu:run-all' }
    ], 0);

    cellMenu.addGroup([
      { type: 'submenu' as Menu.ItemType, submenu: cellTypeMenu}
    ], 1);
    cellMenu.addGroup([
      { type: 'submenu' as Menu.ItemType, submenu: currentOutputMenu},
      { type: 'submenu' as Menu.ItemType, submenu: allOutputMenu}
    ], 2);
    mainMenu.addMenu(cellMenu.menu, { rank : 3 });
  },
  // must add this requires array in addition to the import
  // npm install --save @jupyterlab/mainmenu
  // update package.json with a the correct @jupyterlab version
  // (without installing required packages at compatible version, 
  // you'll see a 'No provider for @jupyterlab/<package> at runtime')
  requires: [
    IMainMenu
  ]

};

export default extension;
