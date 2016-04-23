import vue from 'vue';
import 'font-awesome';
import './module/menu/menu';
import './module/form/checkbox/checkbox';
import './module/form/radio/radio';
import './module/form/select/select';
import './module/tree/tree';
import {kfTable} from './module/table/table';
import {kfTree} from './module/tree/tree';
import './module/form/date/date';
import './module/rotator/rotator';
import './module/layout/layout';
import './module/tab/tab';
import './module/form/file/file';
import './module/pager/pager';

import './module/style/clearfix.css!';
import './module/style/button.css!';
import './module/style/input.css!';
import './module/style/grid.css!';
import './module/style/reset.css!';
import './index.css!';

let stable = {
  action: '<button class="kf-btn kf-xs" @click="TABLE.removeRow(ROW)">删除</button>',
  sampleRow: function() {
    return {name: 'Lagou', email: 'lagou@lagou.com', address: '海置创投大厦', action: this.action};
  },
  appendRow: function() {
    kfTable.appendRow(this, this.sampleRow());
  },
  prependRow: function() {
    kfTable.prependRow(this, this.sampleRow());
  },
  removeRow: function(row) {
    kfTable.deleteRow(row);
  },
  colKeys: ['name', 'email', 'address', 'action'],
  thead: ['姓名', '邮箱', '地址', '操作'],
  tbody: [{
    name: 'Shimoo', email: 'shimoo@lagou.com', address: '清河龙岗路', action: 'NO ACTION'
  }]
};

new vue({
  el: 'body',
  ready: function() {
    kfTable.setHead(this.stable, this.stable.thead);
    kfTable.setBody(this.stable, this.stable.tbody);
  },
  data: {
    stable: stable
  }
});
