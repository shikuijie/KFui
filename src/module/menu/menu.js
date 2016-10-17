import vue from 'vue';
import _ from 'lodash';
import './menu.css!';
import '../code/code';
import cls from './menu.css.map';

vue.component('kf-menu', {
  components: {
    'kf-menu-item': {
      props: ['hrefKey', 'itemKey', 'submenuKey', 'rootData', 'itemData', 'onClick'],
      template:
        '<li :class="getItemCls()" :kf-menu-active="itemData.__mkfActive" @click.stop="setActive()">' +
          '<a v-kf-code="itemData[itemKey]" :href="itemData[hrefKey]" :kf-menu-link="!!itemData[hrefKey]"></a>' +
          '<div v-if="itemData[submenuKey]"></div>' +
          '<kf-menu v-if="itemData[submenuKey]" ' +
                  ':style="top" ' +
                  ':menu="itemData" ' +
                  ':item-key="itemKey" ' +
                  ':root="rootData" ' + 
                  ':on-click="onClick" ' + 
                  ':submenu-key="submenuKey"></kf-menu>' +
        '</li>',
      methods: {
        getItemCls: function() {
          let res = {};
          res[cls.submenu] = !!this.itemData[this.submenuKey];
          return res;
        },
        setActive: function() {
          let cur = this.itemData.__mkfRoot.__mkfActiveItem;

          while(cur) {
            cur.__mkfActive = false;
            cur = cur.__mkfActiveItem;
          }

          cur = this.itemData;
          let parent = cur.__mkfParent,
              root = cur.__mkfRoot;
          while(cur !== root) {
            cur.__mkfActive = true;
            parent.__mkfActiveItem = cur;
            cur = parent;
            parent = parent.__mkfParent;
          }

          this.onClick(this.node);
        }
      },
      data: function() {
        vue.set(this.itemData, '__mkfActive', false);
        return {
          node: this.itemData,
          menu: this.rootData,
          top: {top: (this.itemData.__mkfSubmenuTop - this.itemData.__mkfSelfTop) * 100 + '%'}
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
    },
    onClick: {
      type: Function,
      default: function() {}
    },
    root: Object
  },
  template:
    '<ul :class="cls.menu" class="kf-menu">' +
      '<kf-menu-item v-for="item in menu[submenuKey]" ' +
                    ':href-key="hrefKey" ' +
                    ':item-data="item" ' +
                    ':root-data="rootData" ' +
                    ':item-key="itemKey" ' +
                    ':on-click="onClick" ' +
                    ':submenu-key="submenuKey"></kf-menu-item>' +
    '</ul>',
  data: function() {
    let menu = this.menu,
        key = this.submenuKey;
    if(!menu.__mkfRoot) {
      menu.__mkfRoot = menu;
      menu.__mkfSubmenuTop = 0;
      menu.__mkfSubmenuKey = key;
    }

    init(menu, key);

    return {
      cls: cls,
      rootData: this.root || this.menu
    };
  }
});

function init(menu, smKey) {
    let submenu = menu[smKey] && menu[smKey] || [];
    _.forEach(submenu, function(child, i) {
      child.__mkfRoot = menu.__mkfRoot;
      child.__mkfParent = menu;
      child.__mkfIdx = i;
      if(child[smKey]) {
        if(child[smKey].length > i + menu.__mkfSubmenuTop) {
          child.__mkfSubmenuTop = 0;
        } else {
          child.__mkfSubmenuTop = i + menu.__mkfSubmenuTop + 1 - child[smKey].length;
        }
        child.__mkfSelfTop = menu.__mkfSubmenuTop + i;
      }
    });
}

function setActive(itemData, cb) {
  let cur = itemData.__mkfRoot.__mkfActiveItem;

  while(cur) {
    cur.__mkfActive = false;
    cur = cur.__mkfActiveItem;
  }

  cur = itemData;
  let parent = cur.__mkfParent,
      root = cur.__mkfRoot;
  while(cur !== root) {
    cur.__mkfActive = true;
    parent.__mkfActiveItem = cur;
    cur = parent;
    parent = parent.__mkfParent;
  }

  cb && cb(itemData);
}

export default {
  setBody: function(menu, body) {
    vue.set(menu, menu.__mkfSubmenuKey, body);
    init(menu, menu.__mkfSubmenuKey);
  },
  setActive: function(item, cb) {
    setActive(item, cb)
  }
}
