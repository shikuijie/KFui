import vue from 'vue';
import _ from 'lodash';
import './layout.css!';
import cls from './layout.css.map';

vue.component('kf-layout', {
  data: function() {
    return {
      cls: cls,
      hidden: {left: false, right: true}
    };
  },
  events: {
    'kf-layout-toggle': function(side) {
      if(_.isUndefined(side)) {
        side = 'left';
      }
      this.hidden[side] = !this.hidden[side];
    }
  },
  template:
    '<section :class="cls.wrapper" :kf-left-hidden="hidden.left" :kf-right-hidden="hidden.right">' +
      '<header>' +
        '<slot name="header"></slot>' +
      '</header>' +
      '<section :class="cls.body">' +
        '<aside>' +
          '<slot name="sidebar.left"></slot>' +
        '</aside>' +
        '<main>' +
          '<slot name="body"></slot>' +
        '</main>' +
        '<aside>' +
          '<slot name="sidebar.right"></slot>' +
        '</aside>' +
      '</section>' +
      '<footer>' +
        '<slot name="footer"></slot>' +
      '</footer>' +
    '</section>'
})
