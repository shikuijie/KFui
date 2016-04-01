import vue from 'vue';
import './date.css!';
import cls from './date.css.map';

vue.component('kf-date', {
  data: function() {
    return {
      cls: cls,
      active: 1,
      range: _.range(1, 30)
    };
  },
  methods: {
    getActiveCls: function(index) {
      return this.active == index ? cls.active : '';
    },
    mouseDown: function(event) {
      event.stopPropagation();
      let wrapperHeight = this.$el.getBoundingClientRect(),
          contentHeight = this.$el.querySelector('ul');
    }
  },
  template:
    '<div>' +
    '</div>'
});
