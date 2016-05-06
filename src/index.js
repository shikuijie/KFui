import {vue, kfModal} from './module/ui';
import stable from './demo/stable';
import mtable from './demo/mtable';
import ttable from './demo/ttable';
import form from './demo/form';
import tree from './demo/tree';

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
        kfModal.open(this);
      },
      close: function() {
        kfModal.close(this);
      }
    },
    form: form
  }
};

new vue(vm);
