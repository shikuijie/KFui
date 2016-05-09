import '../module/form/select/select';
import '../module/form/date/date';
import '../module/form/checkbox/checkbox';
import '../module/form/radio/radio';
import '../module/form/validate/validate';
import '../module/form/file/file';
import '../module/form/radio/radio';

let form = {
  currentRow: {name: '张双', email: '', address: '', date: '', start: '', end: '', department: '', skills: [], salary: '', agree: false},
  departCN: ['平台运营部', '技术研发部', '设计部'],
  departEN: ['platform', 'tech', 'design'],
  options: [],
  // setField: function(name, val, val1) {
  //   console.log(name+';'+val);
  //   if(name == 'range') {
  //     form.currentRow.start = val;
  //     form.currentRow.end = val1;
  //   } else if(name === 'name') {
  //     var self = this;
  //     if(!val) return;
  //     setTimeout(function(){
  //       self.options.push(Math.round((Math.random()*100)));
  //     }, 300);
  //     form.currentRow[name] = val;
  //   } else {
  //     form.currentRow[name] = val;
  //   }
  // },
  setField: function(data) {
    console.log(data);
    if(data.name == 'range') {
      //

    } else if(data.name === 'name' && data.getOpt) {
      var self = this;
      if(!data.value) return;
      setTimeout(function(){
        self.options.push(Math.round((Math.random()*100)));
      }, 300);
      form.currentRow[data.name] = data.value;
    } else {
      form.currentRow[data.name] = data.value;
    }
  },
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
