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

new vue({
  el: 'body',
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
          }, {
            item: 'Item101'
          }]
        }, {
          item: 'Item11'
        }]
      }, {
        item: 'Item2'
      }]
    }
  }
});
