import {vue, kfModal, kfToaster, kfMenu} from 'kfui';
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
    kfMenu.setBody(this.menu, [{
      item: '平台运营部',
      submenu: [{
        item: '平台开发中心',
        submenu: [{
          item: '前端研发组'
        }, {
          item: '业务研发组'
        }, {
          item: '数据开发组'
        }]
      }, {
        item: '运营中心',
        submenu: [{
          item: 'B端运营组'
        }, {
          item: 'C端运营组'
        }, {
          item: '移动运营组'
        }]
      }]
    }]);
  },
  methods: {
    onClickMenu: function(item) {
      console.log(item)
    }
  },
  data: {
    stable: stable,
    mtable: mtable,
    ttable: ttable,
    tree: tree,
    form: form,
    menu: {},
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
    getAutoOptions: function(val, options) {
      //options is Array
      setTimeout(function(){
        for(var i=0; i<Math.round(Math.random()*20); i++){
          options.push(val + '' + Math.round(Math.random()*10));
        }
      }, 600);
    }
  }
};

new vue(vm);
