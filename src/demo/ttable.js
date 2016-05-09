import {table} from 'kfui';

function getAction(func, label) {
  return '<button class="kf-btn kf-xs" @click="TABLE.' + func + '(ROW)">' + label + '</button>';
}

export default {
  onReady: function() {
    table.setHead(this, this.thead);
    table.setBody(this, this.tbody);
  },
  sampleRow: function() {
    return {
      name: 'blah', email: 'shimoo@gmail.com', phone: '17012345678', address: '北京市海淀区海淀大街', action: getAction('add', '添加'),
      subrows: [{
        name: 'blahson', email: 'jquery@lagou.com', phone: '15312234566', address: '北京市朝阳区团结湖', action: getAction('remove', '删除')
      }]
    };
  },
  appendRow: function() {
    table.appendRow(this, this.sampleRow());
  },
  prependRow: function() {
    table.prependRow(this, this.sampleRow());
  },
  iterateRows: function() {
    table.iterate(this, function(row) {
      console.log(row.name)
    });
  },
  add: function(row) {
    table.appendRow(row, this.sampleRow());
  },
  remove: function(row) {
    table.deleteRow(row, true);
  },
  thead: ['姓名', '邮箱', '电话', '地址', '操作'],
  tbody: [{
    name: 'Shimoo', email: 'shimoo@gmail.com', phone: '17012345678', address: '北京市海淀区海淀大街', action: getAction('add', '添加'),
    subrows: [{
      name: 'jQuery', email: 'jquery@lagou.com', phone: '15312234566', address: '北京市朝阳区团结湖', action: getAction('remove', '删除')
    }]
  }],
  colKeys: ['name', 'email', 'phone', 'address', 'action']
};
