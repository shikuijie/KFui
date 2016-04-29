import vue from 'vue';
import cls from './modal.css.map';
import './modal.css!';

vue.component('kf-modal', {
  props: {
    open: {
      type: Boolean,
      twoWay: true,
      required: true
    },
    bgclose: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      cls: cls
    };
  },
  methods: {
    getCls: function() {
      let res = {};
      res[cls.modal] = true;
      res[cls.open] = this.open;
      return res;
    },
    close: function() {
      if(this.bgclose) {
        this.open = false;
      }
    }
  },
  template:
    '<section class="kf-modal" :class="getCls()" @click="close()">' +
      '<div :class="cls.center" @click.stop>' +
        '<header><slot name="head"></slot></header>' +
        '<main><slot name="body"></slot></main>' +
        '<footer><slot name="tail"></slot></footer>' +
      '</div>' +
    '</section>'
});
