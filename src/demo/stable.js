import {table} from 'kfui';

function getAction(func, label) {
  return '<button class="kf-btn kf-xs" @click="TABLE.' + func + '(ROW)">' + label + '</button>';
}

function getCheckbox(head, label) {
  let pos = head ? 'TABLE' : 'ROW';
  return '<kf-checkbox :model.sync="' + pos + '.checked"' +
          (label ? ' :label="\'' + label + '\'"' : '') +
          (label ? ' :on-change="TABLE.checkAll"' : '') + '></kf-checkbox>';
}

let stable = {
  checked: false,
  onReady: function() {
    table.setHead(this, this.thead);
    table.setBody(this, this.tbody);
  },
  checkAll: function(val) {
    table.iterate(stable, function(row) {
      row.checked = val;
    });
  },
  sampleRow: function(func, label) {
    return {
      checked: false, checkbox: getCheckbox(),
      name: 'Lagou', date: '2016-01-21', start: '2016-02-28', end: '2016-03-12',
      department: '平台运营部', email: 'lagou@lagou.com',
      address: '海置创投大厦', action: getAction(func, label)
    };
  },
  appendRow: function() {
    table.appendRow(this, this.sampleRow('remove', '删除'));
  },
  iterateRows: function() {
    table.iterate(this, function(row) {
      console.log(row.name, row.email)
    });
  },
  prependRow: function() {
    table.prependRow(this, this.sampleRow('remove', '删除'));
  },
  remove: function(row) {
    table.deleteRow(row);
  },
  edit: function(row) {
    alert('可以在此打开一个弹窗来编辑内容');
  },
  colKeys: ['checkbox', 'name', 'email', 'department', 'address', 'action'],
  thead: [getCheckbox(true, '全部'), '姓名', '邮箱', '部门', '地址', '操作'],
  tbody: [{
    checked: false, checkbox: getCheckbox(),
    name: 'Shimoo', department: 'platform', email: 'shimoo@lagou.com',
    address: '中关村创业大街', action: getAction('edit', '编辑')
  }]
};

export default stable;
