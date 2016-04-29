import vue from 'vue';
import '../code/code';
import 'font-awesome';
import './tree.css!';
import cls from './tree.css.map';

vue.component('kf-tree', {
  components: {
    'kf-tree-node': {
      props: ['nodeData', 'draggable', 'nodeKey', 'subtreeKey', 'toggleKey', 'dropKey'],
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
          cls: cls
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
        },
        dragStatus: function() {
          return this.draggable ? 'true' : 'false';
        }
      },
      methods: {
        toggle: function() {
          this.nodeData.__EXPAND = !this.nodeData.__EXPAND;
          let root = this.nodeData.__ROOT;
          let toggle = root[this.toggleKey];
          toggle && toggle(this.nodeData, this.nodeData.__EXPAND);
        },
        dragStart: function(event) {
          this.nodeData.__DRAGGING = true;
          this.nodeData.__ROOT.__DRAGGING_NODE = this.nodeData;

          event.dataTransfer.setData('text/plain', this.nodeData.__ID);
        },
        dragEnter: function(event) {
          this.nodeData.__DRAGOVER = true;
        },
        dragLeave: function(event) {
          this.nodeData.__DRAGOVER = false;
        },
        drop: function(event) {
          let id = event.dataTransfer.getData('text/plain'),
              root = this.nodeData.__ROOT,
              src = root.__ID_MAP[id],
              target = this.nodeData,
              drop = root[this.dropKey];

          if(drop) {
            drop(src, target);
          }
          target.__DRAGOVER = false;
          target.__ROOT.__DRAGGING_NODE.__DRAGGING = false;
        }
      },
      template:
        '<li :draggable="dragStatus" ' +
            ':kf-tree-node-dragover="nodeData.__DRAGOVER" ' +
            ':kf-tree-node-dragging="nodeData.__DRAGGING" ' +
            '@dragstart.stop="dragStart($event)" ' +
            '@dragenter.stop="dragEnter($event)" ' +
            '@dragleave.stop="dragLeave($event)" ' +
            '@dragover.stop.prevent ' +
            '@drop.stop.prevent="drop($event)">' +
          '<div :class="cls.node">' +
            '<span :class="cls.hborder" :kf-tree-hborder-long="!nodeData[subtreeKey]"></span>' +
            '<i @click="toggle()" :class="icon" v-if="nodeData[subtreeKey]"></i>' +
            '<div v-kf-code="nodeData[nodeKey]"></div>' +
          '</div>' +
          '<div v-show="nodeData.__EXPAND" :class="cls.subtreeWrapper">' +
            '<span :class="cls.vborder"></span>' +
            '<span :class="cls.overlap"></span>' +
            '<kf-tree :class="cls.subtree" v-if="nodeData[subtreeKey]" ' +
                      ':tree="nodeData" ' +
                      ':draggable="draggable" ' +
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
    toggleKey: {
      type: String,
      default: 'onToggle'
    },
    dropKey: {
      type: String,
      default: 'onDrop'
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
  '<ul :class="cls.tree" class="kf-tree">' +
    '<kf-tree-node v-for="node in tree[subtreeKey]" ' +
                  ':draggable="draggable" ' +
                  ':node-data="node" ' +
                  ':node-key="nodeKey" ' +
                  ':drop-key="dropKey" ' +
                  ':toggle-key="toggleKey" ' +
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
  deleteNode: function(node, autoLeaf) {
    let subkey = node.__ROOT.__SUBTREE_KEY,
        coll = node.__PARENT[subkey],
        idx = coll.indexOf(node);

    if(idx == -1) {
      throw '节点不在其父节点的子节点中!';
    }
    coll.splice(idx, 1);

    if(autoLeaf && coll.length == 0) {
      delete node.__PARENT[subkey];
    }
  }
};
