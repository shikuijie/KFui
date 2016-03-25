import vue from 'vue';
import 'font-awesome';
import './index.css!';
import './module/menu/menu.js';
import {kfTable} from './module/table/table.js';
import './module/base';
new vue({
    el: 'body',
    methods: {
      changeMtable: function() {
        kfTable.setHead(this.mtable, ['name', 'age', 'sex', 'email']);
        kfTable.setBody(this.mtable, [{
          name: 'skj', age: 30, sex: ['male', 'female'],
          email: ['skj9798@163.com', 'shikuijie@gmail.com'],
          action: '<button @click="TABLE.click(ROW)">{{ROW.name}}</button>'
        }]);
        kfTable.setFoot(this.mtable, ['name', 'age', 'sex', 'email']);
      },
      appendMrow: function() {
        kfTable.appendRow(this.mtable, {
          name: 'shikuijie', age: 30, sex: ['male', 'female'],
          email: ['skj9798@163.com', 'shikuijie@gmail.com'],
          action: '<button @click="TABLE.click(ROW)">{{ROW.name}}</button>'
        });
      },

      appendSrow: function() {
        kfTable.appendRow(this.stable, {
          name: 'shikuijie', age: 30, sex: 'male', email: 'shikuijie@gmail.com', action: '<button @click=TABLE.click(ROW)>{{ROW.name}}</button>'
        });
      },
      changeStable: function() {
        kfTable.setHead(this.stable, ['name', 'age', 'sex', 'email', 'action']);
        kfTable.setBody(this.stable, [{
          name: 'skj', age: 30, sex: 'male', email: 'skj9798@163.com',
          action: '<button @click=TABLE.click(ROW)>{{ROW.name}}</button>'
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
