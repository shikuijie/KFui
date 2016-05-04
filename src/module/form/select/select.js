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
    value: {},
    options: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      default: function() {
        return [];
      }
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
    value: function(val) {
      this.onChange(this.name && this.name || val, this.name && val);
      this.name && blur(this.input);
    }
  },
  computed: {
    flipObj: function() {
      let val = this.flip;
      if((val.bottom && val.top) || (!val.bottom && !val.top)) {
        val.bottom = true;
        val.top = false;
      }
      if((val.left && val.right) || (!val.left && !val.right)) {
        val.left = true;
        val.right = false;
      }

      return val;
    },
    selectedIndex: function() {
      return this.options.indexOf(this.value);
    },
    selectedLabel: function() {
      return this.labels[this.selectedIndex] || this.options[this.selectedIndex];
    }
  },
  methods: {
    select: function(index) {
      this.value = this.options[index];
      this.visible = false;
    },
    getOptionsCls: function() {
      let res = {};
      res[cls.visible] = this.visible;
      res[cls.left] = this.flipObj.left;
      res[cls.top] = this.flipObj.top;
      res[cls.bottom] = this.flipObj.bottom;
      res[cls.right] = this.flipObj.right;
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
        '<li v-for="option in options" ' +
            ':kf-selected="selectedIndex == $index" ' +
            '@click.stop="select($index)">' +
          '<div v-text="labels[$index] || option"></div>' +
        '</li>' +
      '</ul>' +
    '</div>'
});
