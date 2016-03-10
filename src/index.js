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
          console.log(node.children)
        },
        children: [{
          content: '<input type="checkbox" @click="NODE.choose(NODE)">Item0'
        }, {
          content: 'Item1',
          children: [{
            content: 'Item10',
            children: [{
              content: 'Item100'
            }, {
              content: 'Item101'
            }]
          }, {
            content: 'Item11'
          }]
        }, {
          content: 'Item2'
        }]
      }
    },
    methods: {
    }
});
