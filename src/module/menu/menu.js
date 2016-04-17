import vue from 'vue';
import _ from 'lodash';
import './menu.css!';
import '../code/code';
import cls from './menu.css.map';
import 'animate.css';

vue.component('kf-menu', {
  components: {
    'kf-menu-item': {
      props: ['itemKey', 'submenuKey', 'itemData'],
      template:
        '<li :class="getItemCls()" @click="setActive($event)">' +
          '<a v-text="itemData[itemKey]"></a>' +
          '<div v-if="itemData[submenuKey]"></div>' +
          '<kf-menu v-if="itemData[submenuKey]" ' +
                  ':style="top" ' +
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
        let itemData = this.itemData;
        let children = itemData[this.submenuKey];
        if(children) {
          _.forEach(children, function(child) {
            child.__ROOT = itemData.__ROOT;
          });
        }

        return {
          MENU: this.itemData.__ROOT,
          ITEM: this.itemData,
          top: {top: (this.itemData.__SUBMENU_TOP - this.itemData.__SELF_TOP) * 100 + '%'}
        };
      }
    }
  },
  props: {
    menu: {
      type: Object,
      required: true
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
      '<kf-menu-item v-for="item in menu[submenuKey]" ' +
                    ':item-data="item" ' +
                    ':item-key="itemKey" ' +
                    ':submenu-key="submenuKey"></kf-menu-item>' +
    '</ul>',
  data: function() {
    let menu = this.menu,
        key = this.submenuKey;
    if(!menu.__ROOT) {
      menu.__ROOT = menu;
      menu.__SUBMENU_TOP = 0;
    }

    let submenu = menu[key] && menu[key] || [];
    _.forEach(submenu, function(child, i) {
      child.__ROOT = menu.__ROOT;
      if(child[key]) {
        if(child[key].length > i + menu.__SUBMENU_TOP) {
          child.__SUBMENU_TOP = 0;
        } else {
          child.__SUBMENU_TOP = i + menu.__SUBMENU_TOP + 1 - child[key].length;
        }
        child.__SELF_TOP = menu.__SUBMENU_TOP + i;
      }
    });

    return {
      cls: cls
    };
  }
});
