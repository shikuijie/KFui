import vue from 'vue';
import './menu.css!';
import cls from './menu.css.map';
import '../base';

vue.component('kf-menu', {
  components: {
    'kf-menu-item': {
      props: {
        itemData: {
          type: Object,
          coerce: function(val) {
            if(val.children) {
              val.children.forEach(function(child) {
                child.__ROOT = val.__ROOT;
              });
            }

            return val;
          }
        }
      },
      template:
        '<li :kf-submenu="!!itemData.children">' +
          '<div v-kf-code="itemData.content"></div>' +
          '<div v-if="itemData.children"></div>' +
          '<kf-menu v-if="itemData.children" :menu-data="itemData"></kf-menu>' +
        '</li>',
      data: function() {
        return {
          ROOT: this.itemData.__ROOT,
          NODE: this.itemData
        };
      }
    }
  },

  props: {
    menuData: {
      type: Object,
      coerce: function(val) {
        if(!val.__ROOT) {
          val.__ROOT = val;
        }

        val.children.forEach(function(child) {
          child.__ROOT = val.__ROOT;
        });

        return val;
      }
    }
  },
  template:
    '<ul :class="cls.menu">' +
      '<kf-menu-item v-for="item in menuData.children" :item-data="item"></kf-menu-item>' +
    '</ul>',
  data: function() {
    return {
      cls: cls
    };
  }
});
