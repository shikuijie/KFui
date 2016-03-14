import vue from 'vue';
import 'font-awesome';
import './index.css!';
import 'animate.css';
import './module/switcher/switcher';
import './module/menu/menu.js';
import './module/base';

new vue({
    el: 'body',
    data: {
      switcherOn: true,
      menuData: {
        choose: function(node) {
          console.log(node.title)
        },
        submenu: [{
          title: 'node0',
          item: '<input type="checkbox" @click="ROOT.choose(NODE)">Item0'
        }, {
          item: 'Item1',
          submenu: [{
            item: 'Item10',
            submenu: [{
              item: 'Item100'
            }, {
              title: 'node1',
              item: '<input type="checkbox" @click="ROOT.choose(NODE)">Item101'
            }]
          }, {
            item: 'Item11'
          }]
        }, {
          item: 'Item2'
        }]
      }
    }
});
