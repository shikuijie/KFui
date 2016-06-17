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
    formModal: {
      open: function() {
        kfModal.open(this);
      },
      close: function() {
        kfModal.close(this);
      }
    },
    toaster: {
      showSuccess: function() {
        kfToaster.info(this, '成功了!');
      },
      showError: function() {
        kfToaster.warn(this, '出错啦!');
      }
    },
    onAutoChange: function() {},
    getAutoOptions: function(val) {
      var arr = [];
      for(var i=0; i<Math.round(Math.random()*20); i++){
        arr.push(val + '' + Math.round(Math.random()*10));
      }
      return arr;
    }
  }
};

new vue(vm);
