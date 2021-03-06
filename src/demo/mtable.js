import {kfTable} from 'kfui';

function getAction(func, label) {
  return '<button class="kf-btn kf-xs" @click="table.' + func + '(row)">' + label + '</button>';
}

export default {
  onReady: function() {
    kfTable.setHead(this, this.thead);
    kfTable.setBody(this, this.tbody);
  },
  sampleRow: function() {
    return {
      name: 'Shimoo', email: 'shimoo@gmail.com',
      phone: '17010547517', action: getAction('remove', '删除'),
      address: [{type: '城市', value: '北京'}, {type: '区', value: '海淀区'}, {type: '街道', value: '龙岗路'}]
    }
  },
  appendRow: function() {
    kfTable.appendRow(this, this.sampleRow());
  },
  prependRow: function() {
    kfTable.prependRow(this, this.sampleRow());
  },
  iterateRows: function() {
    kfTable.iterate(this, function(row) {
      console.log(row.name, row.email, row.phone)
    });
  },
  remove: function(row){
    kfTable.deleteRow(row);
  },
  showDetail: function(row) {
    alert(row.name + ' ' + row.email + ' ' + row.phone);
  },
  thead: ['姓名', '邮箱', '手机', '地址类型', '操作', '地址值'],
  colKeys: ['name', 'email', 'phone', 'address[].type', 'action', 'address[].value'],
  tbody: [{
    name: 'Lagou', email: 'Lagou@lagou.com',
    phone: '15741879798', action: getAction('showDetail', '详情'),
    address: [{type: '城市', value: '北京'}, {type: '区', value: '海淀区'}, {type: '街道', value: '海淀大街'}]
  }]
};
