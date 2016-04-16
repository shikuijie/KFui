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
        item: 'Item1'
      }, {
        item: 'Item2',
        submenu: [{
          item: 'Item1'
        }, {
          item: 'Item2',
          submenu: [{
            item: 'Item1'
          }, {
            item: 'Item2'
          }, {
            item: 'Item1'
          }]
        }, {
          item: 'Item1'
        }]
      }, {
        item: 'Item1'
      }, {
        item: 'Item1'
      }, {
        item: 'Item2'
      }, {
        item: 'Item1'
      }, {
        item: 'Item2'
      }, {
        item: 'Item2'
      }, {
        item: 'Item1'
      }, {
        item: 'Item2'
      }, {
        item: 'Item1'
      }]
    }
  }
});
