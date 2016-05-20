import {vue, vueResource as resource} from 'kfui';
vue.use(resource);

let form = {
  name: {value: 'shimoo', required: '请输入姓名字段!'},
  date: {value: '2016-05-21 15:30'},
  range: {value: ['2016-04-30', '2016-06-12']},
  department: {value: 'tech'},
  salary: {value: '8k'},
  agree: {value: 'ok'},
  email: {value: 'shimoo@lagou.com', required: '请输入邮箱字段!', email: '邮箱格式不对!'},
  address: {value: '北京市海淀区中关村', required: '请输入地址字段!', pattern: '请输入5-10个字符!'},
  skills: {
    value: ['c++', 'js'],
    validation: function(value) {
      if(!value || value.length < 2) {
        return '请至少选择两项技能!';
      }
    }
  },

  currentRow: {name: '',addr: '', email: '', address: '', date: '', start: '', end: '', department: '', skills: [], salary: '', agree: false},
  departCN: ['平台运营部', '技术研发部', '设计部'],
  departEN: ['platform', 'tech', 'design'],
  options: [],
  setoptions: function(val){
    var self = this;
    setTimeout(function(val){
      self.options.push('张' + Math.round(Math.random()*100));
    }, 300);
  },
  confirm: function(event) {
    if(event.formData) {
      console.log(event.formData)
    }
  },
  upload: '',
  photoURL: '',
  preview: function(dataURL) {
    form.photoURL = dataURL;
  }
};

export default form;
