import vue from 'vue';
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
    defaultLabel: {
      type: String,
      required: true
    }
  },
  data: function() {
    var index = this.values.indexOf(this.model);
    var label = (index != -1) ? this.labels[index] : this.defaultLabel;
    return {
      cls: cls,
      selectedIndex: index,
      selectedLabel: label
    };
  },
  methods: {
    select: function(index) {
      this.selectedIndex = index;
      this.selectedLabel = this.labels[index];
    }
  },
  template:
    '<div :class="cls.select">' +
      '<div v-kf-code="selectedLabel"></div>' +
      '<div></div>' +
      '<span></span>' +
      '<ul>' +
        '<li v-for="label in labels" ' +
            ':kf-selected="selectedIndex == $index" ' +
            '@click="select($index)">' +
          '<div v-kf-code="label"></div>' +
        '</li>' +
      '</ul>' +
    '</div>'
});
