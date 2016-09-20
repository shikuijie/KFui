import _ from 'lodash';
import vue from 'vue';
import '../code/code';
import './tree.css!';
import cls from './tree.css.map';

vue.component('kf-tree', {
  components: {
    'kf-tree-node': {
      props: ['nodeData', 'nodeKey', 'subtreeKey', 'toggleKey', 'dropKey'],
      data: function() {
        vue.set(this.nodeData, '__mkfExpand', this.nodeData.__mkfExpand || false);
        vue.set(this.nodeData, '__mkfDragover', false);
        vue.set(this.nodeData, '__mkfDragging', false);

        var nodeData = this.nodeData;
        var children = nodeData[this.subtreeKey];
        if(children) {
          children.forEach(function(child) {
            child.__mkfRoot = nodeData.__mkfRoot;
          });
        }

        return {
          tree: this.nodeData.__mkfRoot,
          node: this.nodeData,
          cls: cls
        };
      },
      computed: {
        icon: function() {
          if(this.nodeData.__mkfExpand) {
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
          toggleNode(this.nodeData);
          // this.nodeData.__mkfExpand = !this.nodeData.__mkfExpand;
          // let root = this.nodeData.__mkfRoot;
          // let toggle = root[this.toggleKey];
          // toggle && toggle(this.nodeData, this.nodeData.__mkfExpand);
        },
        dragStart: function(event) {
          this.nodeData.__mkfDragging = true;
          this.nodeData.__mkfRoot.__mkfDraggingNode = this.nodeData;
          this.nodeData.__mkfRoot.__mkfDraggingEl = this.$el.querySelector('.' + cls.node + ' > div');

          event.dataTransfer.setData('text/plain', this.nodeData.__mkfId);
        },
        dragEnter: function(event) {
          this.nodeData.__mkfDragover = true;
        },
        dragLeave: function(event) {
          this.nodeData.__mkfDragover = false;
        },
        drop: function(event) {
          let id = event.dataTransfer.getData('text/plain'),
              root = this.nodeData.__mkfRoot,
              src = root.__mkfIdMap[id],
              target = this.nodeData,
              drop = root[this.dropKey];

          if(drop) {
            drop(src, target, root.__mkfDraggingEl, this.$el.querySelector('.' + cls.node + ' > div'), event);
          }
          target.__mkfDragover = false;
          target.__mkfRoot.__mkfDraggingNode.__mkfDragging = false;
        }
      },
      template:
        '<li draggable="true" ' +
            ':kf-tree-node-dragover="nodeData.__mkfDragover" ' +
            ':kf-tree-node-dragging="nodeData.__mkfDragging" ' +
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
          '<div v-show="nodeData.__mkfExpand" :class="cls.subtreeWrapper">' +
            '<span :class="cls.vborder"></span>' +
            '<span :class="cls.overlap"></span>' +
            '<kf-tree :class="cls.subtree" v-if="nodeData[subtreeKey]" ' +
                      ':tree="nodeData" ' +
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
    let treeData = this.tree;
    if(!treeData.__mkfRoot) {
      treeData.__mkfRoot = treeData;
      treeData.__mkfParent = treeData;
      treeData.__mkfSubtreeKey = this.subtreeKey;
      treeData.__mkfToggleKey = this.toggleKey;
      treeData.__mkfId = 0;
      treeData.__mkfIdMap = {};
    }

    treeData[this.subtreeKey] && treeData[this.subtreeKey].forEach(function(child) {
      child.__mkfRoot = treeData.__mkfRoot;
      child.__mkfParent = treeData;
      child.__mkfId = child.__mkfRoot.__mkfId++;
      child.__mkfRoot.__mkfIdMap[child.__mkfId] = child;
    });

    return {
      cls: cls
    };
  },
  template:
  '<ul :class="cls.tree" class="kf-tree">' +
    '<kf-tree-node v-for="node in tree[subtreeKey]" ' +
                  ':node-data="node" ' +
                  ':node-key="nodeKey" ' +
                  ':drop-key="dropKey" ' +
                  ':toggle-key="toggleKey" ' +
                  ':subtree-key="subtreeKey">' +
    '</kf-tree-node>' +
  '</ul>'
});

function initNewNode(tree, parent, node) {
  node.__mkfRoot = tree;
  node.__mkfParent = parent;
  node.__mkfId = tree.__mkfId++;
  tree.__mkfRoot.__mkfIdMap[node.__mkfId] = node;
}

function toggleNode(node) {
  node.__mkfExpand = !node.__mkfExpand;
  var root = node.__mkfRoot;
  var toggleKey = root.__mkfToggleKey;
  var toggle = root[toggleKey];
  toggle && toggle(node, node.__mkfExpand);
}

export default {
  setBody: function(tree, nodes) {
    if(tree.__mkfRoot !== tree) {
      throw 'setBody第一个参数必须是树对象！';
    }
    tree.__mkfId = 0;
    tree.__mkfIdMap = {};

    let subkey = tree.__mkfRoot.__mkfSubtreeKey;
    nodes.forEach(function(node) {
      initNewNode(tree, tree, node);
    });

    vue.set(tree, subkey, nodes);
  },
  toggle: function(node) {
    toggleNode(node);
  },
  iterate: function(node, cb) {
    var self = this;
    var tree = node.__mkfRoot;
    var subkey = node.__mkfRoot.__mkfSubtreeKey;

    if(node !== node.__mkfRoot) {
      cb(node, node.__mkfParent, node.__mkfRoot);
    }

    _.forEach(node[subkey], function(child) {
      self.iterate(child, cb);
    });
  },
  appendNodes: function(parent, nodes) {
    let subkey = parent.__mkfRoot.__mkfSubtreeKey;
    if(!parent[subkey]) {
      vue.set(parent, subkey, []);
    }

    parent[subkey] = parent[subkey].concat(nodes);

    var tree = parent.__mkfRoot;
    nodes.forEach(function(n) {
      initNewNode(tree, parent, n);
    });
  },
  insertBefore: function(node, newnode) {
    let subkey = node.__mkfRoot.__mkfSubtreeKey,
        coll = node.__mkfParent[subkey],
        idx = coll.indexOf(node);

    coll.splice(idx, 0, newnode);

    initNewNode(node.__mkfRoot, node.__mkfParent, newnode);
  },
  insertAfter: function(node, newnode) {
    let subkey = node.__mkfRoot.__mkfSubtreeKey,
        coll = node.__mkfParent[subkey],
        idx = coll.indexOf(node);

    if(idx === coll.length - 1) {
      coll.push(newnode);
    } else {
      coll.splice(idx + 1, 0, newnode);
    }

    initNewNode(node.__mkfRoot, node.__mkfParent, newnode);
  },
  appendNode: function(parent, node) {
    let subkey = parent.__mkfRoot.__mkfSubtreeKey;
    if(!parent[subkey]) {
      vue.set(parent, subkey, []);
    }

    parent[subkey].push(node);

    initNewNode(parent.__mkfRoot, parent, node);
  },
  deleteNode: function(node, autoLeaf) {
    let subkey = node.__mkfRoot.__mkfSubtreeKey,
        coll = node.__mkfParent[subkey],
        idx = coll.indexOf(node);

    if(idx == -1) {
      throw '节点不在其父节点的子节点中!';
    }
    coll.splice(idx, 1);

    if(autoLeaf && coll.length == 0) {
      delete node.__mkfParent[subkey];
    }
  },
  prependNode: function(parent, node) {
    let subkey = parent.__mkfRoot.__mkfSubtreeKey;
    if(!parent[subkey]) {
      vue.set(parent, subkey, []);
    }

    parent[subkey].unshift(node);
    initNewNode(parent.__mkfRoot, parent, node);
  },
  moveBefore: function(src, target) {
    var subkey = src.__mkfRoot.__mkfSubtreeKey;
    var siblings = src.__mkfParent[subkey];

    var srcIdx = siblings.indexOf(src);
    siblings.splice(srcIdx, 1);

    var tagIdx = siblings.indexOf(target);
    siblings.splice(tagIdx, 0, src);
  },
  moveAfter: function(src, target) {
    var subkey = src.__mkfRoot.__mkfSubtreeKey;
    var siblings = src.__mkfParent[subkey];

    var srcIdx = siblings.indexOf(src);
    siblings.splice(srcIdx, 1);

    var tagIdx = siblings.indexOf(target) + 1;
    siblings.splice(tagIdx, 0, src);
  }
};
