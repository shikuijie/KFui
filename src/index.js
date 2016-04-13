import vue from 'vue';
import 'font-awesome';
import './module/base.css!';
import './index.css!';
import './module/menu/menu';
import './module/form/checkbox/checkbox';
import './module/form/radio/radio';
import './module/form/select/select';
import './module/tree/tree';
import {kfTable} from './module/table/table';
import {kfTree} from './module/tree/tree';
import './module/form/date/date';
import './module/slide/slide';

new vue({
  el: 'body',
  methods: {
    changeMtable: function() {
      kfTable.setHead(this.mtable, ['name', 'age', 'sex', 'email']);
      kfTable.setBody(this.mtable, [{
        name: 'skj', age: 30, sex: ['male', 'female'],
        email: ['skj9798@163.com', 'shikuijie@gmail.com'],
        action: '<button @click="TABLE.click(ROW)" v-text="ROW.name"></button>'
      }]);
      kfTable.setFoot(this.mtable, ['name', 'age', 'sex', 'email']);
    },
    appendMrow: function() {
      kfTable.appendRow(this.mtable, {
        name: 'shikuijie', age: 30, sex: ['male', 'female'],
        email: ['skj9798@163.com', 'shikuijie@gmail.com'],
        action: '<button @click="TABLE.click(ROW)" v-text="ROW.name"></button>'
      });
    },

    appendSrow: function() {
      kfTable.appendRow(this.stable, {
        name: 'shikuijie', age: 30, sex: 'male',
        email: 'shikuijie@gmail.com',
        action: '<button @click=TABLE.click(ROW) v-text="ROW.name"></button>'
      });
    },
    changeStable: function() {
      kfTable.setHead(this.stable, ['name', 'age', 'sex', 'email', 'action']);
      kfTable.setBody(this.stable, [{
        name: 'skj', age: 30, sex: 'male', email: 'skj9798@163.com',
        action: '<button @click=TABLE.click(ROW) v-text="ROW.name"></button>'
      }]);
      kfTable.setFoot(this.stable, ['name', 'age', 'sex', 'email', 'action']);
    },

    createTtable: function() {
      kfTable.setHead(this.ttable, ['name', 'age', 'sex', 'email', 'action']);
      kfTable.setBody(this.ttable, [{
        name: '<button @click="TABLE.toggle(ROW)">shikuijie</button>', sex: 'male', age: 30, email: 'skj9798@163.com',
        action: '<button @click="TABLE.click(TABLE, ROW)">点我</button>',
        children: [{
          name: '<button @click="TABLE.toggle(ROW)">skj</button>', sex: 'female', age: 27, email: 'abc@lagou.com', children: [],
          action: '<button @click="TABLE.click(TABLE, ROW)">点我</button>'
        }]
      }]);
      kfTable.setFoot(this.ttable, ['name', 'age', 'sex', 'email', 'action']);
    }
  },
  data: {
    cb: {name: 'skj'},
    val: {name: 'shikuijie'},
    cbgrp: [],
    val1: {name: 'skj'},
    val2: {name: 'shikuijie'},
    val3: {name: 'simonshi'},
    rdgrp: 1,
    slct: -1,
    aslct: -1,

    moment: '',
    start: '',
    end: '',

    treeData: {
      drop: function(src, target) {
        if(src.subtree && src.subtree.length) {
          kfTree.deleteNode(src);
          kfTree.appendNodes(target, src.subtree);
        }
      },
      toggle: function(isExpand, node) {
        console.log(isExpand, node.node)
      },
      subtree: [{
        label: 'Node1',
        node: '<button v-text="NODE.label"></button>'
      }, {
        node: 'Node12',
        subtree: [{
          node: 'Node121'
        }, {
          node: 'Node122',
          subtree: [{
            node: 'Node1221'
          }, {
            node: 'Node1222',
            subtree: [{
              node: 'Node11'
            }, {
              node: 'Node12',
              subtree: [{
                node: 'Node121'
              }, {
                node: 'Node122',
                subtree: [{
                  node: 'Node1221'
                }, {
                  node: 'Node1222',
                }]
              }]
            }]
          }]
        }]
      }]
    },

    ttable: {
      click: function(table, row) {
        kfTable.deleteRow(table, row);
      },
      toggle: function(row) {
        kfTable.toggleRow(row, function(expand, level) {
          if(!row.children) return;
          if(row.children.length) return;
          if(expand) {
            kfTable.appendRow(row, {
              name: '<button @click="TABLE.toggle(ROW)">simon</button>', sex: 'male', age: 30, email: 'skj9798@163.com',
              action: '<button @click="TABLE.click(TABLE, ROW)">点我</button>',
              children: [{
                name: '<button @click="TABLE.toggle(ROW)">simonshi</button>', sex: 'male', age: 30, email: 'skj9798@163.com',
                action: '<button @click="TABLE.click(TABLE, ROW)">点我</button>'
              }]
            });
          }
        })
      },
    },
    mtable: {
      click: function(row) {
        console.log(row.email)
      }
    },
    stable: {
      click: function(row) {
        console.log(row.email)
        row.age = 40;
      }
    },
    menuData: {
      choose: function(node) {
        console.log(node.title)
      },
      submenu: [{
        title: 'node0',
        item: '<input type="checkbox" @click="MENU.choose(ITEM)">Item0'
      }, {
        item: 'Item1',
        submenu: [{
          item: 'Item10',
          submenu: [{
            item: 'Item100'
          }, {
            title: 'node1',
            item: '<input type="checkbox" @click="MENU.choose(ITEM)">Item101'
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
