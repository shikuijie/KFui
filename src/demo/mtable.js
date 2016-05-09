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
      name: 'Shimoo', email: 'shimoo@gmail.com',
      phone: '17010547517', action: getAction('remove', '删除'),
      address: [{type: '城市', value: '北京'}, {type: '区', value: '海淀区'}, {type: '街道', value: '龙岗路'}]
    }
  },
  appendRow: function() {
    table.appendRow(this, this.sampleRow());
  },
  prependRow: function() {
    table.prependRow(this, this.sampleRow());
  },
  iterateRows: function() {
    table.iterate(this, function(row) {
      console.log(row.name, row.email, row.phone)
    });
  },
  remove: function(row){
    table.deleteRow(row);
  },
  showDetail: function(row) {
    alert(row.name + ' ' + row.email + ' ' + row.phone);
  },
  thead: ['姓名', '邮箱', '手机', '地址类型', '地址值', '操作'],
  colKeys: ['name', 'email', 'phone', 'address[].type', 'address[].value', 'action'],
  tbody: [{
    name: 'Lagou', email: 'Lagou@lagou.com',
    phone: '15741879798', action: getAction('showDetail', '详情'),
    address: [{type: '城市', value: '北京'}, {type: '区', value: '海淀区'}, {type: '街道', value: '海淀大街'}]
  }]
};
