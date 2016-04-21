import vue from 'vue';
import _ from 'lodash';
import './menu.css!';
import '../code/code';
import cls from './menu.css.map';
import 'animate.css';

vue.component('kf-menu', {
  components: {
    'kf-menu-item': {
      props: ['hrefKey', 'itemKey', 'submenuKey', 'itemData'],
      template:
        '<li :class="getItemCls()" :kf-menu-active="itemData.__ACTIVE" @click.stop="setActive()">' +
          '<a v-text="itemData[itemKey]" :href="itemData[hrefKey]" :kf-menu-link="!!itemData[hrefKey]"></a>' +
          '<div v-if="itemData[submenuKey]"></div>' +
          '<kf-menu v-if="itemData[submenuKey]" ' +
                  ':style="top" ' +
                  ':menu="itemData" ' +
                  ':item-key="itemKey" ' +
                  ':submenu-key="submenuKey"></kf-menu>' +
        '</li>',
      methods: {
        getItemCls: function() {
          let res = {};
          res[cls.submenu] = !!this.itemData[this.submenuKey];
          return res;
        },
        setActive: function() {
          if(!this.itemData[this.hrefKey]) return;
          let cur = this.itemData.__ROOT.__ACTIVE_ITEM;

          while(cur) {
            cur.__ACTIVE = false;
            cur = cur.__ACTIVE_ITEM;
          }

          cur = this.itemData;
          let parent = cur.__PARENT,
              root = cur.__ROOT;
          while(cur !== root) {
            cur.__ACTIVE = true;
            parent.__ACTIVE_ITEM = cur;
            cur = parent;
            parent = parent.__PARENT;
          }
        }
      },
      data: function() {
        vue.set(this.itemData, '__ACTIVE', false);
        return {
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
    hrefKey: {
      type: String,
      default: 'href'
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
    '<ul :class="cls.menu" class="kf-menu">' +
      '<kf-menu-item v-for="item in menu[submenuKey]" ' +
                    ':href-key="hrefKey" ' +
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
      child.__PARENT = menu;
      child.__IDX = i;
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
