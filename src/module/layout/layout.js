import vue from 'vue';
import _ from 'lodash';
import './layout.css!';
import cls from './layout.css.map';

vue.component('kf-layout', {
  data: function() {
    return {
      cls: cls,
      visible: {left: false, right: false}
    };
  },
  events: {
    'kf-layout-toggle': function(side) {
      if(_.isUndefined(side)) {
        side = 'left';
      }
      this.visible[side] = !this.visible[side];
    }
  },
  template:
    '<section :class="cls.wrapper" :kf-left-visible="visible.left" :kf-right-visible="visible.right">' +
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
