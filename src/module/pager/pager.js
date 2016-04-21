import vue from 'vue';
import './pager.css!';
import cls from './pager.css.map';

vue.component('kf-pager', {
  props: {
    pageEntries: {
      type: Array,
      default: [10, 20, 50, 100]
    },
    totalEntries: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    visiblePages: {
      type: Number,
      default: 5
    },
    onChangeEntry: {
      type: Function,
      default: () => {}
    },
    onChangePage: {
      type: Function,
      default: () => {}
    }
  },
  data: function() {
    return {
      cls: cls
    };
  },
  template:
    '<div class="kf-pager" :class="cls.pager">' +
      '<div></div>' +
      '<ul></ul>' +
    '</div>'
})
