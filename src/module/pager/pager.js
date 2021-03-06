import vue from 'vue';
import './pager.css!';
import cls from './pager.css.map';

vue.component('kf-pager', {
  props: {
    initEntry: Number,
    pageEntries: {
      type: Array,
      default: function() {
        return [10, 20, 50, 100];
      }
    },
    totalEntries: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: null,
      default: 1
    },
    visiblePages: {
      type: Number,
      default: 5
    },
    canChange: {
      type: Function,
      default: function() {
        return true;
      }
    },
    onChange: {
      type: Function,
      default: function() {}
    }
  },
  data: function() {
    return {
      cls: cls,
      pageEntry: this.initEntry || this.pageEntries[0],
      current: this.currentPage - 1
    };
  },
  watch: {
    currentPage: function(val) {
      if(_.isObject(val) && this.canChange()) {
        let page = val.page || 1;
        this.current = page - 1;
        this.currentPage = page;
        this.onChange(page, this.pageEntry);
      }
    },
    current: function(val) {
      this.currentPage = val + 1;
    }
  },
  computed: {
    pages: function() {
      return Math.ceil(this.totalEntries / this.pageEntry);
    },
    pageRange: function() {
      let pages = Math.ceil(this.totalEntries / this.pageEntry);
      let half = Math.floor(this.visiblePages/2);
      let start = this.current - half;
      if(start < 0) {
        start = 0;
      } else if(start + this.visiblePages >= pages) {
        start = pages - this.visiblePages;
      }

      let end = start + this.visiblePages;

      if(pages < this.visiblePages) {
        start = 0;
        end = pages;
      }

      return _.range(start, end);
    }
  },
  methods: {
    leftmost: function() {
      if(this.current === 0) return;
      if(!this.canChange()) return;
      this.current = 0;
      this.onChange(this.current + 1, this.pageEntry);
    },
    rightmost: function() {
      if(this.current === this.pages - 1) return;
      if(!this.canChange()) return;
      this.current = this.pages - 1;
      this.onChange(this.current + 1, this.pageEntry);
    },
    prev: function() {
      if(this.current === 0) return;
      if(!this.canChange()) return;
      let prev = this.current - 1;
      if(prev < 0) return;
      this.current = prev;
      this.onChange(this.current + 1, this.pageEntry);
    },
    next: function() {
      if(this.current === this.pages - 1) return;
      if(!this.canChange()) return;
      let next = this.current + 1;
      if(next == this.pages) return;
      this.current = next;
      this.onChange(this.current + 1, this.pageEntry);
    },
    go: function(n) {
      if(this.current === n) return;
      if(!this.canChange()) return;
      if(n >= this.pages || n < 0) return;
      this.current = n;
      this.onChange(this.current + 1, this.pageEntry);
    },
    onChangeEntry: function() {
      if(!this.canChange()) return;
      this.current = 0;
      this.onChange(this.current + 1, this.pageEntry);
    }
  },
  template:
    '<div class="kf-pager" :class="cls.pager">' +
      '<ul>' +
        '<li @click="leftmost()"><span class="fa fa-angle-double-left"></span></li>' +
        '<li @click="prev()"><span class="fa fa-angle-left"></span></li>' +
        '<li v-for="n in pageRange" @click="go(n)" :kf-pager-active="n == current"><span v-text="n+1"></span></li>' +
        '<li @click="next()"><span class="fa fa-angle-right"></span></li>' +
        '<li @click="rightmost()"><span class="fa fa-angle-double-right"></span></li>' +
      '</ul>' +
      '<div :class="cls.right">' +
        '<div :class="cls.entry">每页' +
          '<div>' +
            '<span v-text="pageEntry"></span>' +
            '<i class="fa fa-caret-down"></i>' +
            '<select v-model="pageEntry" @change="onChangeEntry()">' +
              '<option v-for="opt in pageEntries" :value="opt" v-text="opt"></option>' +
            '</select>' +
          '</div>' +
        '项</div>' +
        '<span :class="cls.slash">/</span>' +
        '<div :class="cls.pageNo">' +
          '共<span v-text="pages"></span>页' +
        '</div>' +
        '<div :class="cls.entryNo">' +
          '<span v-text="totalEntries"></span>项' +
        '</div>' +
        '<div :class="cls.input">' +
          '<div>' +
            '<div>' +
              '<input type="pager" v-model="currentPage" @keyup.enter="go(currentPage - 1)"/>' +
            '</div>' +
            '<span class="fa fa-caret-right" @click="go(currentPage - 1)"></span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
});
