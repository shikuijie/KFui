import vue from 'vue';
import '../../code/code';
import cls from './select.css.map';
import './select.css!';

function blur(elem) {
  let event = new FocusEvent('blur');
  elem.dispatchEvent(event);
}

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
    name: String,
    required: {
      type: Boolean,
      default: false
    },
    onChange: {
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
  ready: function() {
    this.input = this.$el.querySelector('input');
  },
  data: function() {
    return {
      cls: cls,
      visible: false
    };
  },
  watch: {
    model: function(val) {
      this.onChange(val);
      this.name && blur(this.input);
    }
  },
  computed: {
    selectedIndex: function() {
      return this.values.indexOf(this.model);
    },
    selectedLabel: function() {
      return this.labels[this.selectedIndex];
    }
  },
  methods: {
    select: function(index) {
      this.model = this.values[index];
      this.visible = false;
    },
    getOptionsCls: function() {
      let res = {};
      res[cls.visible] = this.visible;
      res[cls.left] = this.flip.left;
      res[cls.top] = this.flip.top;
      res[cls.bottom] = this.flip.bottom;
      res[cls.right] = this.flip.right;
      return res;
    },
    hide: function() {
      this.visible = false;
    }
  },
  template:
    '<div :class="cls.select" class="kf-select" @click="visible = true">' +
      '<input type="text" autocomplete="off" :name="name" :required="required" :value="selectedLabel">' +
      '<div :class="cls.bg" v-show="visible" @click.stop="hide()"></div>' +
      '<i></i>' +
      '<ul :class="getOptionsCls()">' +
        '<li v-for="label in labels" ' +
            ':kf-selected="selectedIndex == $index" ' +
            '@click.stop="select($index)">' +
          '<div v-text="label"></div>' +
        '</li>' +
      '</ul>' +
    '</div>'
});
