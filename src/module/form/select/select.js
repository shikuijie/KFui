import vue from 'vue';
import '../../code/code';
import cls from './select.css.map';
import './select.css!';

vue.component('kf-select', {
  props: {
    value: null,
    options: {
      type: Array,
      default: () => { return []; }
    },
    labels: {
      type: Array,
      default: () => { return []; }
    },
    placeholder: String,
    name: String,
    required: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    onDrop: {
      type: Function,
      default: () => { return true; }
    },
    flip: {
      type: Object,
      default: function() {
        return {bottom: true, left: true};
      }
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      cls: cls,
      visible: false
    };
  },
  compiled: function() {
    this.input = this.$el.querySelector('input');
    this.input && (this.input.__mkfParent = this);
    this.$on('kf.form.init', function(init) {
      this.value = init;
    });
  },
  ready: function() {
    this.$on('kf.form.reset', function(val) {
      this.value = val;
    });
  },
  destroyed: function() {
    this.$off('kf.form.init');
  },
  watch: {
    value: function(val) {
      if(_.isObject(val) && !Object.keys(val).length) {
        this.value = null;
        return;
      }
      this.onChange(val, this.name);
      this.input && this.input.__mkfBus && this.input.__mkfBus.$emit('kf.form.change', this.input, val);
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
      return this.labels[this.selectedIndex] || this.options[this.selectedIndex] || this.placeholder;
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
    },
    show: function() {
      if(!this.onDrop()) return;
      if(this.options.length) {
        this.visible = true;
      }
    },
    clear: function() {
      this.value = null;
    }
  },
  template:
    '<div :class="cls.select" class="kf-select" @click="show()">' +
      '<input type="select" autocomplete="off" :name="name" :required="required" v-model="selectedLabel">' +
      '<div :class="cls.bg" v-show="visible" @click.stop="hide()"></div>' +
      '<span v-if="clearable" @click.stop="clear()" class="fa fa-times"></span>' +
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
