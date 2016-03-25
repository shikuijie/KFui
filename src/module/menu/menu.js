import vue from 'vue';
import './menu.css!';
import cls from './menu.css.map';
import '../base';
import 'animate.css';

vue.component('kf-menu', {
  components: {
    'kf-menu-item': {
      props: ['itemKey', 'submenuKey', 'itemData'],
      template:
        '<li :kf-submenu="!!itemData[submenuKey]">' +
          '<div v-kf-code="itemData[itemKey]"></div>' +
          '<div v-if="itemData[submenuKey]"></div>' +
          '<kf-menu v-if="itemData[submenuKey]" ' +
                  ':menu="itemData" ' +
                  ':item-key="itemKey" ' +
                  ':submenu-key="submenuKey"></kf-menu>' +
        '</li>',
      data: function() {
        var itemData = this.itemData;
        var children = itemData[this.submenuKey];
        if(children) {
          children.forEach(function(child) {
            child.__ROOT = itemData.__ROOT;
          });
        }

        return {
          MENU: this.itemData.__ROOT,
          ITEM: this.itemData
        };
      }
    }
  },
  props: {
    menu: Object,
    itemKey: {
      type: String,
      default: 'item'
    },
    submenuKey: {
      type: String,
      default: 'submenu'
    }
  },
  template:
    '<ul :class="cls.menu">' +
      '<kf-menu-item v-for="item in menu[submenuKey]" ' +
                    ':item-data="item" ' +
                    ':item-key="itemKey" ' +
                    ':submenu-key="submenuKey"></kf-menu-item>' +
    '</ul>',
  data: function() {
    var menuData = this.menu;
    if(!menuData.__ROOT) {
      menuData.__ROOT = menuData;
    }

    menuData[this.submenuKey] && menuData[this.submenuKey].forEach(function(child) {
      child.__ROOT = menuData.__ROOT;
    });

    return {
      cls: cls
    };
  }
});
