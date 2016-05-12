import {kfTree} from 'kfui';

let treeData = {
  onDrop: function(src, target) {
    console.log('drag ' + src.node + ' to ' + target.node);
  },
  onToggle: function(node, expand) {
    console.log((expand ? 'show ' : 'hide ') + node.node);
  },
  subtree: [{
    node: '节点1',
    subtree: [{
      node: '节点11',
      subtree: [{
        node: '节点111'
      }, {
        node: '节点112'
      }]
    }, {
      node: '节点12'
    }]
  }, {
    node: '节点2',
    subtree: [{
      node: '节点21'
    }, {
      node: '节点22'
    }]
  }]
};

export default treeData;
