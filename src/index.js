import vue from 'vue';
import 'font-awesome';

import './module/layout/layout';
import './module/tab/tab';
import './module/modal/modal';
import './module/toaster/toaster';
import './module/autofill/autofill';

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
import toaster from './demo/toaster';

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
      open: false
    },
    form: form,
    toaster: toaster,
    options: []
  },
  methods: {
    success: function() {
      toaster.show('成功了！');
    },
    error: function(){
      toaster.showError('失败提示信息！');
    },
    onChange: function(val){
      console.log(val);
      var self = this;
      setTimeout(function(){
        self.options = [1,2];
      }, 300);
    },
    getValue: function(val){
      console.log('input final value = '+val);
    }
  }
};

new vue(vm);
