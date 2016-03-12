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
      menuData: {
        choose: function(node) {
          console.log('choose ' + node.label)
        },
        children: [{
          label: 'node1',
          content: '<input type="checkbox" @click="ROOT.choose(NODE)">Item0'
        }, {
          content: 'Item1',
          children: [{
            content: 'Item10',
            children: [{
              content: 'Item100'
            }, {
              label: 'node2',
              content: '<input type="checkbox" @click="ROOT.choose(NODE)">Item101'
            }]
          }, {
            content: 'Item11'
          }]
        }, {
          content: 'Item2'
        }]
      }
    }
});
