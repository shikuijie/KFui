import vue from 'vue';
import cls from './modal.css.map';
import './modal.css!';

vue.component('kf-modal', {
  props: {
    modal: {
      type: Object,
      required: true
    },
    bgclose: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    vue.set(this.modal, '__OPEN', false);
    return {
      cls: cls
    };
  },
  computed: {
    open: function() {
      return this.modal.__OPEN;
    }
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
        this.modal.__OPEN = false;
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

export default {
  open: function(modal) {
    modal.__OPEN = true;
  },
  close: function(modal) {
    modal.__OPEN = false;
  }
};
