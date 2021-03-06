import vue from 'vue';
import _ from 'lodash';
import './file.css!';
import cls from './file.css.map';

vue.component('kf-file', {
  props: {
    onChange: {
      type: Function,
      default: () => {}
    },
    onSuccess: {
      type: Function,
      default: () => {}
    },
    onError: {
      type: Function,
      default: () => {}
    },
    showList: {
      type: Boolean,
      default: true
    },
    validate: {
      type: Function,
      default: (f) => {}
    },
    url: String,
    appendum: {
      type: Object,
      default: function() {
        return {};
      }
    },
    preview: Function,
    accept: String,
    label: {
      type: String,
      default: '上传'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    },
    flip: {
      type: Object,
      default: function() {
        return {bottom: true, left: true};
      }
    }
  },
  data: function() {
    return {
      cls: cls,
      files: [],
      listVisible: false,
      fileOver: false,
      dragging: false
    };
  },
  ready: function() {
    this.input = this.$el.querySelector('input');
  },
  computed: {
    flipObj: function() {
      let val = this.flip;
      if((val.bottom && val.top) || (!val.bottom && !val.top)) {
        val.bottom = true;
        val.top = false;
      }
      if((val.left && val.right) || (!val.left && !val.right)) {
        val.left = true;
        val.right = false;
      }

      return val;
    }
  },
  methods: {
    clear: function(event) {
      this.input && (this.input.value = '');
      this.input && (this.input.__mkfNoerr = false);
      this.files = [];
      this.preview && this.preview('');

      this.input && this.input.__mkfBus && this.input.__mkfBus.$emit('kf.form.change', this.input, '');
    },
    change: function(event) {
      _.forEach(this.files, function(file) {
        if(file.doing) {
          file.xhr.abort();
        }
      });
      processFiles(this, event.target.files);
    },
    getListCls: function() {
      let res = {};
      res[cls.visible] = this.listVisible && this.files.length && this.showList;
      res[cls.left] = this.flipObj.left;
      res[cls.top] = this.flipObj.top;
      res[cls.bottom] = this.flipObj.bottom;
      res[cls.right] = this.flipObj.right;
      return res;
    },
    getProgCls: function(f) {
      let res = {};
      res[cls.error] = f.error;
      return res;
    },
    dragEnter: function(event) {
      this.fileOver = true;
    },
    dragOver: function(event) {
      this.fileOver = true;
    },
    dragLeave: function(event) {
      this.fileOver = false;
    },
    dragDrop: function(event) {
      this.fileOver = false;
      this.dragging = false;

      processFiles(this, event.dataTransfer.files);
    }
  },
  template:
    '<div :class="cls.file" class="kf-file" :kf-file-over="fileOver" ' +
          '@dragenter.stop.prevent="dragEnter($event)" ' +
          '@dragover.stop.prevent="dragOver($event)" ' +
          '@dragleave.stop.prevent="dragLeave($event)" ' +
          '@drop.stop.prevent="dragDrop($event)">' +
      '<a v-text="label"></a>' +
      '<span @click.stop="listVisible = true">' +
        '<i class="fa fa-caret-down"></i>' +
      '</span>' +
      '<input :accept="accept" :name="name" :required="required" type="file" :multiple="multiple" @click="clear($event)" @change="change($event)">' +
      '<div :class="cls.bg" v-show="files.length && listVisible" @click.stop="listVisible = false"></div>' +
      '<ul :class="getListCls()">' +
        '<li v-for="f in files">' +
          '<div>' +
            '<span v-text="f.name"></span>' +
            '<span v-text="f.errorInfo || f.size"></span>' +
            '<span>' +
              '<i class="fa fa-check-circle" v-show="f.done"></i>' +
              '<i class="fa fa-spin fa-spinner" v-show="f.doing"></i>' +
              '<i class="fa fa-exclamation-circle" :class="cls.error" v-show="f.error"></i>' +
            '</span>' +
          '</div>' +
          '<div :class="getProgCls(f)" :style="{width: f.progress}"></div>' +
        '</li>' +
      '</ul>' +
    '</div>'
});

function normalize(size) {
  if(size >= (1 << 30)) {
    return Math.floor(size/(1<<30) * 100)/100 + 'GB';
  } else if(size >= (1 << 20)) {
    return Math.floor(size/(1<<20) * 100)/100 + 'MB';
  } else if(size >= (1 << 10)) {
    return Math.floor(size/(1<<10) * 100)/100 + 'KB';
  } else {
    return size + 'B';
  }
}

function startUpload(url, name, file, other, success, error) {
  file.doing = true;

  let xhr = new XMLHttpRequest();
  file.xhr = xhr;

  xhr.addEventListener('load', function(event) {
    file.doing = false;
    if(event.target.status != 200) {
      file.error = true;
      error(event.target);
    } else {
      file.done = true;
      success(event.target);
    }
  });

  xhr.addEventListener('error', function(event) {
    file.doing = false;
    file.error = true;
    error(event.target);
  });

  xhr.upload.addEventListener('progress', function(event) {
    if(event.lengthComputable) {
      file.progress = Math.floor(event.loaded/event.total * 10000)/100 + '%';
    }
  });

  let data = new FormData();
  data.append(name, file.file);
  _.forEach(other, function(val, key) {
    data.append(key, val);
  });

  xhr.open('POST', url);
  xhr.send(data);
}

function processFiles(self, fileList) {
  let hasError = false;
  let files = _.map(fileList, function(f) {
    let error = self.validate(f);
    if(error) {
      hasError = true;
    }

    return {
      name: f.name,
      size: normalize(f.size),
      file: f,
      progress: 0,
      doing: false,
      done: false,
      error: !!error,
      errorInfo: error
    };
  });
  if(!files.length) return;

  self.files = files;
  self.listVisible = true;
  if(hasError) {
    return;
  }
  self.onChange(fileList, self.name);
  self.input.__mkfNoerr = true;
  self.input.__mkfBus && self.input.__mkfBus.$emit('kf.form.change', self.input, fileList);

  if(self.preview) {
    _.forEach(files, function(f) {
      let reader = new FileReader();
      reader.readAsDataURL(f.file);
      reader.onload = function(e) {
        self.preview(e.target.result);
      };
    });
  }

  if(self.auto) {
    _.forEach(self.files, function(f) {
      startUpload(self.url, self.name, f, self.appendum, self.onSuccess, self.onError);
    });
  }
}

export default {
  upload: function(url, fieldName, fileContent, data, success, error) {
    startUpload(url, fieldName, {file: fileContent}, data, success, function(result) {
      if(result.status == 401) {
        error && error('权限错误!');
      } else if(result.status == 500) {
        error && error('系统内部错误!');
      } else if(result.status == 404) {
        error && error('请求路径不存在!');
      } else if(result.status == 400) {
        error && error('操作错误！');
      } else {
        error && error('网络错误!');
      }
    });
  }
};