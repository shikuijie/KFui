import {vue, modal, toaster} from 'kfui';
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
    form: form,
    modal: {
      open: function() {
        modal.open(this);
      },
      close: function() {
        modal.close(this);
      }
    },
    toaster: {
      showSuccess: function(t) {
        toaster.succeed(t, '成功了!');
      },
      showError: function(t) {
        toaster.fail(t, '出错啦!');
      }
    }
  }
};

new vue(vm);
