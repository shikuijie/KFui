import {vue, modal} from 'kfui';
import stable from './stable';
import mtable from './mtable';
import ttable from './ttable';
import form from './form';
import tree from './tree';

let vm = {
  el: 'body',
  ready: function() {
    stable.onReady();
    mtable.onReady();
    ttable.onReady();
  },
  data: {
    stable: stable,
    mtable: mtable,
    ttable: ttable,
    tree: tree,
    modal: {
      open: function() {
        modal.open(this);
      },
      close: function() {
        modal.close(this);
      }
    },
    form: form
  }
};

new vue(vm);
