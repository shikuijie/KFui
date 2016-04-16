import vue from 'vue';
import 'font-awesome';
import './module/base.css!';
import './index.css!';
import './module/menu/menu';
import './module/form/checkbox/checkbox';
import './module/form/radio/radio';
import './module/form/select/select';
import './module/tree/tree';
import {kfTable} from './module/table/table';
import {kfTree} from './module/tree/tree';
import './module/form/date/date';
import './module/slide/slide';
import './module/layout/layout';

new vue({
  el: 'body',
  methods: {
    toggleSidebar: function(side) {
      this.$broadcast('kf-layout-toggle', side);
    }
  },
  data: {
    menuData: {
      submenu: [{
        item: 'Item0'
      }, {
        item: 'Item1',
        submenu: [{
          item: 'Item10',
          submenu: [{
            item: 'Item100'
          }]
        }]
      }, {
        item: 'Item2',
        submenu: [{
          item: 'Item20'
        }, {
          item: 'Item21',
          submenu: [{
            item: 'Item210'
          }, {
            item: 'Item211'
          }, {
            item: 'Item212'
          }, {
            item: 'Item213'
          }, {
            item: 'Item214'
          }, {
            item: 'Item215'
          }, {
            item: 'Item216'
          }]
        }, {
          item: 'Item3',
        }]
      }, {
        item: 'Item3'
      }, {
        item: 'Item4',
        submenu: [{
          item: 'Item40'
        }, {
          item: 'Item41'
        }, {
          item: 'Item42',
          submenu: [{
            item: 'Item420'
          }, {
            item: 'Item421'
          }]
        }, {
          item: 'Item43'
        }, {
          item: 'Item44'
        }, {
          item: 'Item45'
        }, {
          item: 'Item46',
          submenu: [{
            item: 'Item460'
          }, {
            item: 'Item461'
          }, {
            item: 'Item462'
          }]
        }]
      }, {
        item: 'Item5'
      }]
    }
  }
});
