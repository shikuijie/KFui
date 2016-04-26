import vue from 'vue';
import cls from './modal.css.map';
import './modal.css!';

vue.component('kf-modal', {
  props: {
    open: {
      type: Boolean,
      twoWay: true,
      required: true
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
    }
  },
  template:
    '<section class="kf-modal" :class="getCls()">' +
      '<div :class="cls.center">' +
        '<header><slot name="head"></slot></header>' +
        '<main><slot name="body"></slot></main>' +
        '<footer><slot name="tail"></slot></footer>' +
      '</div>' +
    '</section>'
});
