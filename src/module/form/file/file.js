import vue from 'vue';
import './file.css!';
import cls from './file.css.map';

let dragStart = null, dragOver = null, dragEnd = null;

vue.component('kf-file', {
  props: {
    success: {
      type: Function,
      default: () => {}
    },
    error: {
      type: Function,
      default: () => {}
    },
    validate: {
      type: Function,
      default: (f) => { return true; }
    },
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'file'
    },
    other: {
      type: Object,
      default: {}
    },
    label: {
      type: String,
      default: '上传'
    },
    multiple: {
      type: Boolean,
      default: false
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
  methods: {
    change: function(event) {
      let self = this;
      let files = _.map(event.target.files, function(f) {
        if(!self.validate(f)) return;

        return {
          name: f.name,
          size: normalize(f.size),
          file: f,
          progress: 0,
          doing: false,
          done: false,
          error: false
        };
      });
      if(!files.length) return;

      this.listVisible = true;
      this.files = files;
      _.forEach(files, function(f) {
        startUpload(self.url, self.name, f, self.other, self.success, self.error);
      });
    },
    getListCls: function() {
      return this.listVisible && this.files.length ? cls.visible : '';
    },
    getProgCls: function(f) {
      return f.error ? cls.error : '';
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
      let files = event.dataTransfer.files;
    }
  },
  template:
    '<div :class="cls.file" :kf-file-over="fileOver" ' +
          '@dragenter.stop.prevent="dragEnter($event)" ' +
          '@dragover.stop.prevent="dragOver($event)" ' +
          '@dragleave.stop.prevent="dragLeave($event)" ' +
          '@drop.stop.prevent="dragDrop($event)">' +
      '<a v-text="label"></a>' +
      '<span @click.stop="listVisible = true">' +
        '<i class="fa fa-caret-down"></i>' +
      '</span>' +
      '<input type="file" :multiple="multiple" @change="change($event)">' +
      '<div :class="cls.bg" v-show="files.length && listVisible" @click.stop="listVisible = false"></div>' +
      '<ul :class="getListCls()">' +
        '<li v-for="f in files">' +
          '<div>' +
            '<span v-text="f.name"></span>' +
            '<span v-text="f.size"></span>' +
            '<span>' +
              '<i class="fa fa-check-circle" v-show="f.done"></i>' +
              '<i class="fa fa-spin fa-spinner" v-show="f.doing"></i>' +
              '<i class="fa fa-exclamation-circle" v-show="f.error"></i>' +
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
