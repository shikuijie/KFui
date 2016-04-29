import vue from 'vue';
import 'font-awesome';

import './module/layout/layout';
import './module/tab/tab';
import './module/modal/modal';

import './module/style/clearfix.css!';
import './module/style/button.css!';
import './module/style/input.css!';
import './module/style/form.css!';
import './module/style/grid.css!';
import './module/style/reset.css!';
import './index.css!';

import stable from './demo/stable';
import mtable from './demo/mtable';
import ttable from './demo/ttable';
import tree from './demo/tree';
import form from './demo/form';

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
    modal: {open: false},
    form: form
  }
};

new vue(vm);
