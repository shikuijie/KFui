import vue from 'vue';
import './menu.css!';
import cls from './menu.css.map';
import '../base';

vue.component('kf-menu', {
  components: {
    'kf-menu-item': {
      props: {
        itemKey: {
          type: String,
          default: 'item'
        },
        submenuKey: {
          type: String,
          default: 'submenu'
        },
        itemData: {
          type: Object
        }
      },
      template:
        '<li :kf-submenu="!!itemData[submenuKey]">' +
          '<div v-kf-code="itemData[itemKey]"></div>' +
          '<div v-if="itemData[submenuKey]"></div>' +
          '<kf-menu v-if="itemData[submenuKey]" ' +
                  ':menu-data="itemData" ' +
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
          ROOT: this.itemData.__ROOT,
          NODE: this.itemData
        };
      }
    }
  },

  props: {
    menuData: {
      type: Object
    },
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
      '<kf-menu-item v-for="item in menuData[submenuKey]" ' +
                    ':item-data="item" ' +
                    ':item-key="itemKey" ' +
                    ':submenu-key="submenuKey"></kf-menu-item>' +
    '</ul>',
  data: function() {
    var menuData = this.menuData;
    if(!menuData.__ROOT) {
      menuData.__ROOT = this.menuData;
    }

    menuData[this.submenuKey] && menuData[this.submenuKey].forEach(function(child) {
      child.__ROOT = menuData.__ROOT;
    });

    return {
      cls: cls
    };
  }
});
