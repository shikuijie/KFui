import '../module/form/select/select';
import '../module/form/date/date';
import '../module/form/checkbox/checkbox';
import '../module/form/radio/radio';
import '../module/form/validate/validate';
import '../module/form/file/file';
import '../module/form/radio/radio';

let form = {
  currentRow: {name: 2, email: '', address: '', date: '', start: '', end: '', department: '', skills: [], salary: '', agree: false},
  departCN: ['平台运营部', '技术研发部', '设计部'],
  departEN: ['platform', 'tech', 'design'],
  validator: {
    name: {required: '请输入姓名字段!'},
    email: {required: '请输入邮箱字段!', email: '邮箱格式不对!'},
    address: {required: '请输入地址字段!', pattern: '请输入5-10个字符!'},
    skills: {
      validation: function() {
        if(form.currentRow.skills.length < 2) {
          return '请至少选择两项技能!';
        }
      }
    }
  },
  confirm: function(event) {
    if(form.validator.formValid) {
    }
  },
  upload: '',
  photoURL: '',
  preview: function(dataURL) {
    form.photoURL = dataURL;
  }
};

export default form;
