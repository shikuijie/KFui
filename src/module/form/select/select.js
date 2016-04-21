import vue from 'vue';
import '../../code/code';
import cls from './select.css.map';
import './select.css!';

vue.component('kf-select', {
  props: {
    model: {
      type: null,
      twoWay: true,
      required: true
    },
    values: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    onSelect: {
      type: Function,
      default: () => {}
    },
    flip: {
      type: Object,
      default: function() {
        return {bottom: true, left: true};
      },
      coerce: function(val) {
        if((val.bottom && val.top) || (!val.bottom && !val.top)) {
          val.bottom = true;
          val.top = false;
        }
        if((val.left && val.right) || (!val.left && !val.right)) {
          val.left = true;
          val.right = false;
        }

        return val;
      }
    },
  },
  data: function() {
    let index = this.values.indexOf(this.model),
        label = (index != -1) ? this.labels[index] : ''
    return {
      cls: cls,
      selectedIndex: index,
      selectedLabel: label,
      visible: false
    };
  },
  methods: {
    select: function(index) {
      this.selectedIndex = index;
      this.selectedLabel = this.labels[index];
      this.model = this.values[index];
      this.visible = false;
      this.onSelect(index);
    },
    getOptionsCls: function() {
      let res = {};
      res[cls.visible] = this.visible;
      res[cls.left] = this.flip.left;
      res[cls.top] = this.flip.top;
      res[cls.bottom] = this.flip.bottom;
      res[cls.right] = this.flip.right;
      return res;
    }
  },
  template:
    '<div :class="cls.select" class="kf-select" @click="visible = true">' +
      '<input readonly type="text" :value="selectedLabel">' +
      '<div :class="cls.bg" v-show="visible" @click.stop="visible = false"></div>' +
      '<span></span>' +
      '<ul :class="getOptionsCls()">' +
        '<li v-for="label in labels" ' +
            ':kf-selected="selectedIndex == $index" ' +
            '@click.stop="select($index)">' +
          '<div v-text="label"></div>' +
        '</li>' +
      '</ul>' +
    '</div>'
});
