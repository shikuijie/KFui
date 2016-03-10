import vue from 'vue';
import './menu.css!';
import cls from './menu.css.map';
import '../base';

vue.component('kf-menu', {
  props: {
    menuData: {
      type: Object,
      coerce: function(val) {
        val.children && val.children.forEach(function(child) {
          if(child.children) {
            child.$$_submenu = true;
          }
        });

        return val;
      }
    }
  },
  template:
    '<ul :class="cls.menu">' +
      '<li v-for="item in menuData.children" :kf-submenu="item.$$_submenu">' +
        '<div v-kf-code="item.content"></div>' +
        '<div v-if="item.children"></div>' +
        '<kf-menu v-if="item.children" :menu-data="item"></kf-menu>' +
      '</li>' +
    '</ul>',
  data: function() {
    return {
      cls: cls,
      NODE: this.menuData
    };
  }
});
