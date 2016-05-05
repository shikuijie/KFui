import {vue, kfTable} from 'kfui';
console.log(vue)

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
