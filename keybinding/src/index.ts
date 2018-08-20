import {
 JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

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
  id: 'launcher_keybinding',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension launcher_keybinding is activated!');
    app.commands.addKeyBinding({
            selector: '[data-jp-kernel-user]:focus',
            keys: ['N', 'N'],
            command: 'launcher:create'
        });
  }

};

export default extension;
