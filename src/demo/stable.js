import {kfTable} from '../module/table/table';
import '../module/form/checkbox/checkbox';
import '../module/form/validate/validate';

function getAction(func, label) {
  return '<button class="kf-btn kf-xs" @click="TABLE.' + func + '(ROW)">' + label + '</button>';
}

function getCheckbox(head, label) {
  let pos = head ? 'TABLE' : 'ROW';
  return '<kf-checkbox :model.sync="' + pos + '.checked"' +
          (label ? ' :label="\'' + label + '\'"' : '') +
          (label ? ' :on-change="TABLE.checkAll"' : '') + '></kf-checkbox>';
}

export var stable = {
  modal: {
    editOpen: false,
    currentRow: {name: '', email: '', address: ''},
    error: {
      name: {required: '请输入姓名字段!'},
      email: {required: '请输入邮箱字段!', email: '邮箱格式不对!'},
      address: {required: '请输入地址字段!', pattern: '请输入5-10个字符!'}
    },
    confirmEdit: function(event) {
      if(stable.modal.error.formValid) {
        stable.modal.editOpen = false;
      }
    }
  },
  checked: false,
  onReady: function() {
    kfTable.setHead(this, this.thead);
    kfTable.setBody(this, this.tbody);
  },
  checkAll: function(val) {
    kfTable.iterate(stable, function(row) {
      row.checked = val;
    });
  },
  sampleRow: function(func, label) {
    return {
      checked: false, checkbox: getCheckbox(),
      name: 'Lagou', email: 'lagou@lagou.com',
      address: '海置创投大厦', action: getAction(func, label)
    };
  },
  appendRow: function() {
    kfTable.appendRow(this, this.sampleRow('remove', '删除'));
  },
  iterateRows: function() {
    kfTable.iterate(this, function(row) {
      console.log(row.name, row.email)
    });
  },
  prependRow: function() {
    kfTable.prependRow(this, this.sampleRow('remove', '删除'));
  },
  remove: function(row) {
    kfTable.deleteRow(row);
  },
  edit: function(row) {
    this.modal.editOpen = true;
    this.modal.currentRow.row = row;
    _.extend(this.modal.currentRow, row);
  },
  colKeys: ['checkbox', 'name', 'email', 'address', 'action'],
  thead: [getCheckbox(true, '全部'), '姓名', '邮箱', '地址', '操作'],
  tbody: [{
    checked: false, checkbox: getCheckbox(),
    name: 'Shimoo', email: 'shimoo@lagou.com',
    address: '中关村创业大街', action: getAction('edit', '编辑')
  }]
};
