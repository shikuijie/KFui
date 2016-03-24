import vue from 'vue';
import _ from 'lodash';
import styles from './table.css.map';
import './table.css!';

let thead = vue.extend({
  props: ['tableData', 'headData'],
  template:
    '<thead>' +
      '<tr v-for="(rn, trow) in thead.rows" track-by="$index">' +
        '<th v-for="(cn, tcol) in trow" track-by="$index"' +
            'v-if="thead.rowspan[cn][rn] && thead.colspan[rn][cn]" ' +
            ':rowspan="thead.rowspan[cn][rn]" ' +
            ':colspan="thead.colspan[rn][cn]"> ' +
          '<div v-kf-code="tcol"></div>' +
        '</th>' +
      '</tr>' +
    '</thead>',
  data: function() {
    return {
      TABLE: this.tableData,
      thead: parseHeadFoot(this.headData)
    };
  }
});

let tfoot = vue.extend({
  props: ['tableData', 'footData'],
  template:
    '<tfoot>' +
      '<tr v-for="(rn, trow) in tfoot.rows" track-by="$index">' +
        '<th v-for="(cn, tcol) in trow" track-by="$index"' +
            'v-if="tfoot.rowspan[cn][rn] && tfoot.colspan[rn][cn]" ' +
            ':rowspan="tfoot.rowspan[cn][rn]" ' +
            ':colspan="tfoot.colspan[rn][cn]"> ' +
          '<div v-kf-code="tcol"></div>' +
        '</th>' +
      '</tr>' +
    '</tfoot>',
  data: function() {
    return {
      TABLE: this.tableData,
      tfoot: parseHeadFoot(this.footData)
    };
  }
});

let srow = vue.extend({
  props: ['tableData', 'rowData', 'colKeys'],
  template:
    '<tr>' +
        '<td v-for="colKey in colKeys">' +
          '<div v-kf-code="getValue(rowData, colKey)"></div>' +
        '</td>' +
    '</tr>',
  data: function() {
    return {
      TABLE: this.tableData,
      ROW: this.rowData
    };
  },
  methods: {
    getValue: function(row, ckey) {
      let ks = ckey.split('.');
      return _.reduce(ks, function(res, k) {
        return res && res[k];
      }, row);
    }
  }
});

vue.component('kf-stable', {
  components: {
    'kf-thead': thead,
    'kf-srow': srow,
    'kf-tfoot': tfoot
  },
  props: {
    colKeys: Array,
    table: Object
  },
  template:
    '<table>' +
      '<thead is="kf-thead" v-if="table.__thead" :head-data="headData" :table-data="table"></thead>' +
      '<tbody v-if="table.__tbody">' +
        '<tr is="kf-srow" v-for="row in table.__tbody" :row-data="row" :col-keys="colKeys" :table-data="table"></tr>' +
      '</tbody>' +
      '<tfoot is="kf-tfoot" v-if="table.__tfoot" :foot-data="footData" :table-data="table"></thead>' +
    '</table>',
  computed: {
    headData: function() {
      return parseHeadFoot(this.table.__thead);
    },
    footData: function() {
      return parseHeadFoot(this.table.__tfoot);
    }
  }
});

let mrow = vue.extend({
  props: ['tableData', 'rowData', 'colKeys'],
  template:
    '<tbody>' +
        '<tr v-for="(rn, keyRow) in rowData.__keyRows" track-by="$index">' +
          '<td v-for="(cn, key) in colKeys" track-by="$index" ' +
              'v-if="rowData.__rowspan[rn][cn]" ' +
              ':rowspan="rowData.__rowspan[rn][cn]">' +
            '<div v-kf-code="getValue(rowData, keyRow[rowData.__keyMap[key]])"></div>' +
          '</td>' +
          '<div v-kf-code="getValue(rowData, colKey)"></div>' +
        '</tr>' +
    '</tbody>',
  data: function() {
    parseMrow(this.rowData, this.colKeys);
    return {
      TABLE: this.tableData,
      ROW: this.rowData
    };
  },
  methods: {
    getValue: function(row, ckey) {
      if(!ckey) return;

      let ks = ckey.split('.');
      return _.reduce(ks, function(r, k) {
        let m = k.match(/^(\w+)\[(\d+)]/);
        if(m) {
          return r[m[1]] && r[m[1]][m[2]];
        } else {
          return r && r[k];
        }
      }, row);
    }
  }
});

let mtable = vue.component('kf-mtable', {
  components: {
    'kf-thead': thead,
    'kf-tfoot': tfoot,
    'kf-mrow': mrow
  },
  props: {
    table: Object,
    colKeys: Array,
  },
  template:
    '<table>' +
      '<thead is="kf-thead" v-if="table.__thead" :head-data="table.__thead" :table-data="table"></thead>' +
      '<tbody is="kf-mrow" v-if="table.__tbody" v-for="row in table.__tbody" :row-data="row" :table-data="table" :col-keys="colKeys"></tbody>' +
      '<tfoot is="kf-tfoot" v-if="table.__tfoot" :foot-data="table.__tfoot" :table-data="table"></thead>' +
    '</table>'
});

let trow = vue.extend({
  props: ['tableData', 'rowData', 'colKeys', 'childrenKey', 'openIcon', 'closeIcon', 'spinIcon'],
  template:
    '<tr :class="rowData.__lvlCls" v-show="visible">' +
      '<td>' +
        // '<i :class="iconCls" @click="toggle()" v-if="rowData[childrenKey]"></i>' +
        '<div v-kf-code="rowData[colKeys[0]]"></div>' +
      '</td>' +
      '<td v-for="ck in colKeys.slice(1)"><div v-kf-code="rowData[ck]"></div></td>' +
    '</tr>',
  data: function() {
    vue.set(this.rowData, '__expand', false);
    return {
      TABLE: this.tableData,
      ROW: this.rowData,
      styles: styles
    };
  },
  methods: {
    toggle: function() {
      this.rowData.__expand = !this.rowData.__expand;
    }
  },
  computed: {
    visible: function() {
      let cur = this.rowData.__parent;
      while(cur !== this.tableData) {
        if(!cur.__expand) {
          return false;
        }
        cur = cur.__parent;
      }
      return true;
    },
    iconCls: function() {
      if(!this.rowData[this.childrenKey]) {
        return null;
      } else if(!this.rowData.__expand) {
        return this.closeIcon;
      } else if(this.rowData[this.childrenKey].length) {
        return this.openIcon;
      } else {
        return this.spinIcon;
      }
    }
  }
});

vue.component('kf-ttable', {
  components: {
    'kf-thead': thead,
    'kf-trow': trow,
    'kf-tfoot': tfoot
  },
  props: {
    table: Object,
    colKeys: Array,
    childrenKey: String,
    openIcon: String,
    closeIcon: String,
    spinIcon: String
  },
  template:
    '<table :class="styles.ttable">' +
      '<thead is="kf-thead" v-if="table.__thead" :table-data="table" :head-data="table.__thead"></thead>' +
      '<tbody v-if="table.__tbody">' +
        '<tr is="kf-trow" v-for="row in tbody" ' +
            ':table-data="table" :row-data="row" :col-keys="colKeys" ' +
            ':children-key="childrenKey" :open-icon="openIcon" ' +
            ':close-icon="closeIcon" :spin-icon="spinIcon">' +
        '</tr>' +
      '</tbody>' +
      '<tfoot is="kf-tfoot" v-if="table.__tfoot" :table-data="table" :foot-data="table.__tfoot"></tfoot>' +
    '</table>',
  data: function() {
    return {
      styles: styles
    };
  },
  computed: {
    tbody: function() {
      return parseTrows(this.table, this.table.__tbody, this.childrenKey);
    }
  }
});

function parseMrow(row, keys) {
  fixRow(row, keys);

  row.__keyRows = flattenField(siftRow(row, keys));
  row.__keyMap = _.reduce(row.__keyRows[0], function(res, key, i) {
    key = key.replace(/(\w+)\[\d+]/g, function(s0, s1) {
      return s1 + '[]';
    });
    res[key] = i;

    return res;
  }, {});
  row.__rowspan = mergeRow(row.__keyRows);

  //将row对象中与colKeys有关的成员补全
  function fixRow(row, colKeys) {
    _.forEach(colKeys, function(key) {
      fixField(row, key.split('.'));
    });

    //keys指定了row中某个成员的取值路径
    //如果row中该成员不存在,则补全该路径上的成员
    function fixField(row, keys) {
      let k = keys[0], m = k.match(/^(\w+)\[]$/), tk = keys.slice(1);
      if(m) {
        row[m[1]] = row[m[1]] || [];

        if(keys.length > 1) {
          if(row[m[1]].length == 0) {
            row[m[1]].push({});
          }
          _.forEach(row[m[1]], function(r) {
            fixField(r, tk);
          });
        }
      } else {
        if(keys.length > 1) {
          row[k] = row[k] || {};
          fixField(row[k], tk);
        }
      }
    }
  }

  //将row对象中与colKeys有关的成员过滤出来
  function siftRow(row, colKeys) {
    let sift = {};
    _.forEach(colKeys, function(ck) {
      siftField(row, ck.split('.'), sift);
    });

    return sift;

    //keys指定了row中某个成员的取值路径
    //将sift中与keys对应的成员的值置为1,表示该成员需要显示
    function siftField(row, keys, sift) {
      let hk = keys[0], m = hk.match(/^(\w+)\[]$/), tk = keys.slice(1);
      if(m) {
        hk = m[1];
        if(!_.isArray(row[hk])) {
          throw hk + '[]: 行对象中相应成员不是数组';
        }
      }

      if(keys.length > 1 && !_.isObject(row[hk])) {
        throw hk + '.: 行对象中相应成员不是对象';
      }

      if(_.isArray(row[hk])) {
        sift[hk] = sift[hk] || [];

        _.forEach(row[hk], function(elem, i) {
          if(_.isArray(elem)) {
            throw '数组元素为数组';
          }

          if(_.isObject(elem)) {
            sift[hk][i] = sift[hk][i] || {};
            siftField(elem, tk, sift[hk][i]);
          } else {
            sift[hk][i] = 1;
          }
        })
      } else if(_.isObject(row[hk])) {
        sift[hk] = sift[hk] || {};
        siftField(row[hk], tk, sift[hk]);
      } else {
        sift[hk] = 1;
      }

      return sift;
    }
  }

  //将row中的成员平铺
  function flattenField(row, key) {
    let rows = [];
    if(_.isArray(row)) {
      rows = _.reduce(row, function(res, elem, i) {
        if(_.isArray(elem)) {
          throw '数组的元素仍为数组,不支持';
        }

        res = res.concat(_.map(flattenField(elem, '[' + i + ']'), function(t) {
          return _.map(t, function(tk) {
            return key && (key + tk) || tk;
          });
        }));

        return res;
      }, []);
    } else if(_.isObject(row)) {
      let keyCols = [];
      let rowNum = 0;
      _.forEach(row, function(val, k) {
        let flatten = _.map(flattenField(val, k), function(t) {
          return _.map(t, function(tk) {
            return key && (key + '.' + tk) || tk;
          });
        });
        keyCols.push(flatten);

        if(rowNum < flatten.length) {
          rowNum = flatten.length;
        }
      });

      _.forEach(keyCols, function(col) {
        while(col.length < rowNum) {
          col.push(col[col.length - 1]);
        }
      });

      while(--rowNum >= 0) {
        rows.unshift(_.reduce(keyCols, function(res, col) {
          return res.concat(col[rowNum]);
        }, []));
      }
    } else {
      rows.push([key]);
    }

    return rows;
  }

  //合并行
  function mergeRow(keyRows) {
    return _.reduce(keyRows, function(res, kr, r) {
      if(r == 0) {
        res.push(_.map(kr, function() { return 1; }));
      } else {
        res.push(_.reduce(kr, function(rres, k, c) {
          if(k == keyRows[r-1][c]) {
            let sr = r;
            while(res[--sr][c] == 0);
            res[sr][c] += 1;

            rres.push(0);
          } else {
            rres.push(1);
          }

          return rres;
        }, []));
      }

      return res;
    }, []);
  }
}

function parseHeadFoot(partData) {
  let cols = parseArrayCols(partData, []),
      rows = getArrayRows(cols),
      rowspan = mergeArrayRows(cols),
      colspan = mergeArrayCols(rows);

  return {
    rows: rows,
    rowspan: rowspan,
    colspan: colspan
  };

  function parseArrayCols(array, cols) {
    let nrow = 0;
    _.forEach(array, function(elem) {
      if(!_.isArray(elem)) {
        return cols.push([elem]);
      }

      let elemRows = [], elemCols = [], nElemCols = 0;
      _.forEach(elem, function(el) {
        if(_.isArray(el)) {
          let elCols = parseArrayCols(el, []);
          if(elCols.length > nElemCols) {
            nElemCols = elCols.length;
          }

          elemRows.push(elCols);
        } else {
          if(nElemCols < 1) {
            nElemCols = 1;
          }

          elemRows.push([[el]]);
        }
      });

      _.forEach(elemRows, function(elRow) {
        while(elRow.length < nElemCols) {
          elRow.push(elRow[elRow.length - 1]);
        }
      });

      while(--nElemCols >= 0) {
        elemCols.unshift(_.reduce(elemRows, function(res, elRow) {
          return res.concat(elRow[nElemCols]);
        }, []));
      }

      if(elemCols[0].length > nrow) {
        nrow = elemCols[0].length;
      }
      cols = cols.concat(elemCols);
    });

    _.forEach(cols, function(col) {
      while(col.length < nrow) {
        col.push(col[col.length - 1]);
      }
    });

    return cols;
  }

  function mergeArrayRows(cols) {
    let spans = [];
    _.forEach(cols, function(col) {
      spans.push(_.reduce(col, function(res, el, r) {
        if(r == 0) {
          res.push(1);
        } else if(el == col[r-1]) {
          let cr = r;
          while(col[--cr] == el);

          res.push(0);
          res[cr+1] += 1;
        } else {
          res.push(1);
        }

        return res;
      }, []));
    });

    return spans;
  }

  function getArrayRows(cols) {
    let rows = [];
    _.forEach(cols, function(col) {
      _.forEach(col, function(el, r) {
        rows[r] = rows[r] || [];
        rows[r].push(el);
      });
    });

    return rows;
  }

  function mergeArrayCols(rows) {
    let spans = [];
    _.forEach(rows, function(row) {
      spans.push(_.reduce(row, function(res, el, c) {
        if(c == 0) {
          res.push(1);
        } else if(el == row[c-1]) {
          let cc = c;
          while(row[--cc] == el);

          res.push(0);
          res[cc+1] += 1;
        } else {
          res.push(1);
        }

        return res;
      }, []));
    });

    return spans;
  }
}

function parseTrows(table, rows, childrenKey) {
  table.__childrenKey = childrenKey;
  table.__root = table;

  return _.reduce(rows, function(res, row) {
    row.__root = table;
    row.__parent = table;
    row.__lvl = 0;
    row.__lvlCls = styles['level' + row.__lvl];

    parseRow(table, row, res);
    return res;
  }, []);

  function parseRow(table, row, res) {
    res.push(row);

    _.forEach(row[childrenKey], function(child) {
      child.__root = table;
      child.__parent = row;
      child.__lvl = row.__lvl + 1;
      child.__lvlCls = styles['level' + child.__lvl];

      parseRow(table, child, res);
    });
  }
}

export var kfTable = {
  setHead: function(table, headData) {
    vue.set(table, '__thead', headData);
  },
  setFoot: function(table, footData) {
    vue.set(table, '__tfoot', footData);
  },
  setBody: function(table, bodyData) {
    vue.set(table, '__tbody', bodyData);
  },
  prependRow: function(target, row) {
    if(target.__root) {
      if(target.__root === target) {
        target.__tbody.unshift(row);
      } else {
        target[target.__root.__childrenKey].unshift(row);
      }
    } else {
      target.__tbody.unshift(row);
    }
  },
  appendRow: function(target, row) {
    if(target.__root) {
      if(target.__root === target) {
        target.__tbody.push(row);
      } else {
        target[target.__root.__childrenKey].push(row);
      }
    } else {
      target.__tbody.push(row);
    }
  },
  deleteRow: function(table, row) {
    let coll = table.__tbody;
    if(table.__root && (row.__parent !== table)) {
      coll = row.__parent[table.__childrenKey];
    }

    let idx = coll.indexOf(row);
    coll.splice(idx, 1);
  },
  toggleRow: function(row, cb) {
    if(row.__root) {
      row.__expand = !row.__expand;
      cb && cb(row.__expand, row.__lvl);
    }
  }
};
