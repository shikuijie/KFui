import {vue, kfModal, kfToaster} from 'kfui';
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
        kfModal.open(this);
      },
      close: function() {
        kfModal.close(this);
      }
    },
    toaster: {
      showSuccess: function() {
        kfToaster.succeed(this, '成功了!');
      },
      showError: function() {
        kfToaster.fail(this, '出错啦!');
      }
    },
    onAutoChange: function() {},
    getAutoOptions: function() {
      return [1, 2];
    }
  }
};

new vue(vm);
