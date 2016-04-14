import vue from 'vue';
import './menu.css!';
import '../code/code';
import cls from './menu.css.map';
import 'animate.css';

vue.component('kf-menu', {
  components: {
    'kf-menu-item': {
      props: ['itemKey', 'submenuKey', 'itemData'],
      template:
        '<li :class="getItemCls()">' +
          '<a v-text="itemData[itemKey]"></a>' +
          '<div v-if="itemData[submenuKey]"></div>' +
          '<kf-menu v-if="itemData[submenuKey]" ' +
                  ':menu="itemData" ' +
                  ':item-key="itemKey" ' +
                  ':submenu-key="submenuKey"></kf-menu>' +
        '</li>',
      methods: {
        getItemCls: function() {
          return this.itemData[this.submenuKey] && cls.submenu || '';
        }
      },
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
