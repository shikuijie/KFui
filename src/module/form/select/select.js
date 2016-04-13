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
    }
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
      if(this.visible) return cls.visible;
    }
  },
  template:
    '<div :class="cls.select" @click="visible = true">' +
      '<div :class="cls.input">' +
        '<input readonly type="text" :value="selectedLabel">' +
      '</div>' +
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
