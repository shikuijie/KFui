import vue from 'vue';
import '../code/code';
import 'font-awesome';
import './tree.css!';
import cls from './tree.css.map';

vue.component('kf-tree', {
  components: {
    'kf-tree-node': {
      props: ['nodeData', 'dragEnable', 'nodeKey', 'subtreeKey'],
      data: function() {
        vue.set(this.nodeData, '__EXPAND', false);
        vue.set(this.nodeData, '__DRAGOVER', false);
        vue.set(this.nodeData, '__DRAGGING', false);

        var nodeData = this.nodeData;
        var children = nodeData[this.subtreeKey];
        if(children) {
          children.forEach(function(child) {
            child.__ROOT = nodeData.__ROOT;
          });
        }

        return {
          TREE: this.nodeData.__ROOT,
          NODE: this.nodeData,
          cls: cls,
          draggable: this.dragEnable ? 'true' : 'false'
        };
      },
      computed: {
        icon: function() {
          if(this.nodeData.__EXPAND) {
            if(this.nodeData[this.subtreeKey] && this.nodeData[this.subtreeKey].length) {
              return 'fa fa-minus-square-o';
            } else {
              return 'fa fa-spin fa-spinner';
            }
          } else {
            return 'fa fa-plus-square-o';
          }
        }
      },
      methods: {
        toggle: function() {
          this.nodeData.__EXPAND = !this.nodeData.__EXPAND;
          let toggle = this.nodeData.__ROOT.toggle;
          toggle && toggle(this.nodeData.__EXPAND, this.nodeData);
        },
        dragStart: function(event) {
          event.stopPropagation();
          this.nodeData.__DRAGGING = true;
          this.nodeData.__ROOT.__DRAGGING_NODE = this.nodeData;

          event.dataTransfer.setData('text/plain', this.nodeData.__ID);
        },
        dragEnter: function(event) {
          event.stopPropagation();
          this.nodeData.__DRAGOVER = true;
        },
        dragOver: function(event) {
          event.preventDefault();
          event.stopPropagation();
        },
        dragLeave: function(event) {
          event.stopPropagation();
          this.nodeData.__DRAGOVER = false;
        },
        drop: function(event) {
          event.stopPropagation();
          event.preventDefault();

          let id = event.dataTransfer.getData('text/plain'),
              src = this.nodeData.__ROOT.__ID_MAP[id],
              target = this.nodeData,
              drop = this.nodeData.__ROOT.drop;

          if(drop) {
            let after = drop(src, target);
            if(after && after.then) {
              after.then(function() {
                target.__DRAGOVER = false;
                target.__ROOT.__DRAGGING_NODE.__DRAGGING = false;
              });
            } else {
              target.__DRAGOVER = false;
              target.__ROOT.__DRAGGING_NODE.__DRAGGING = false;
            }
          }
        }
      },
      template:
        '<li :draggable="draggable" ' +
            ':kf-tree-node-dragover="nodeData.__DRAGOVER" ' +
            ':kf-tree-node-dragging="nodeData.__DRAGGING" ' +
            '@dragstart="dragStart($event)" ' +
            '@dragenter="dragEnter($event)" ' +
            '@dragleave="dragLeave($event)" ' +
            '@dragover="dragOver($event)" ' +
            '@drop="drop($event)">' +
          '<div>' +
            '<span></span>' +
            '<i @click="toggle()" :class="icon" v-if="nodeData[subtreeKey]"></i>' +
            '<div v-kf-code="nodeData[nodeKey]"></div>' +
          '</div>' +
          '<div v-show="nodeData.__EXPAND">' +
            '<span></span>' +
            '<span></span>' +
            '<kf-tree :class="cls.subtree" v-if="nodeData[subtreeKey]" ' +
                      ':tree="nodeData" ' +
                      ':draggable="dragEnable" ' +
                      ':node-key="nodeKey" ' +
                      ':subtree-key="subtreeKey">' +
            '</kf-tree>' +
          '</div>' +
        '</li>',
    }
  },
  props: {
    tree: {
      type: Object,
      required: true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    nodeKey: {
      type: String,
      default: 'node'
    },
    subtreeKey: {
      type: String,
      default: 'subtree'
    }
  },
  data: function() {
    let treeData = this.tree,
        draggable = this.draggable;
    if(!treeData.__ROOT) {
      treeData.__ROOT = treeData;
      treeData.__PARENT = treeData;
      treeData.__SUBTREE_KEY = this.subtreeKey;
      if(draggable) {
        treeData.__ID = 0;
        treeData.__ID_MAP = {};
      }
    }

    treeData[this.subtreeKey] && treeData[this.subtreeKey].forEach(function(child) {
      child.__ROOT = treeData.__ROOT;
      child.__PARENT = treeData;
      if(draggable) {
        child.__ID = child.__ROOT.__ID++;
        child.__ROOT.__ID_MAP[child.__ID] = child;
      }
    });

    return {
      cls: cls
    };
  },
  template:
  '<ul :class="cls.tree">' +
    '<kf-tree-node v-for="node in tree[subtreeKey]" ' +
                  ':drag-enable="draggable" ' +
                  ':node-data="node" ' +
                  ':node-key="nodeKey" ' +
                  ':subtree-key="subtreeKey">' +
    '</kf-tree-node>' +
  '</ul>'
});

export default {
  appendNodes: function(parent, nodes) {
    let subkey = parent.__ROOT.__SUBTREE_KEY;
    if(!parent[subkey]) {
      vue.set(parent, subkey, []);
    }

    parent[subkey] = parent[subkey].concat(nodes);
  },
  appendNode: function(parent, node) {
    let subkey = parent.__ROOT.__SUBTREE_KEY;
    if(!parent[subkey]) {
      vue.set(parent, subkey, []);
    }

    parent[subkey].push(node);
  },
  deleteNode: function(node, autoDownGrade) {
    let subkey = node.__ROOT.__SUBTREE_KEY,
        coll = node.__PARENT[subkey],
        idx = coll.indexOf(node);

    if(idx == -1) {
      throw '节点不在其父节点的子节点中!';
    }
    coll.splice(idx, 1);

    if(autoDownGrade && coll.length == 0) {
      delete node.__PARENT[subkey];
    }
  }
};
