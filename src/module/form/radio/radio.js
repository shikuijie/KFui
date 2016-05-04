import vue from 'vue';
import 'font-awesome';
import '../../code/code';
import './radio.css!';
import cls from './radio.css.map';

function blur(elem) {
  let event = new FocusEvent('blur');
  elem.dispatchEvent(event);
}

vue.component('kf-radio-group', {
  props: {
    onChange: {
      type: Function,
      default: () => {}
    },
    labels: {
      type: Array,
      default: () => { return []; }
    },
    options: {
      type: Array,
      required: true
    },
    value: {},
    name: String,
    required: {
      type: Boolean,
      default: false
    }
  },
  ready: function() {
    this.inputs = this.$el.querySelectorAll('input');
  },
  data: function() {
    return {
      cls: cls
    };
  },
  watch: {
    value: function(val) {
      this.onChange(this.name && this.name || val, this.name && val);
      this.name && blur(this.inputs[0]);
    }
  },
  template:
    '<span :class="cls.rdgrp" class="kf-radio-group">' +
      '<span v-for="option in options">' +
        '<input :name="name" :required="required" type="radio" v-model="value" :value="option"/>' +
        '<i class="fa fa-dot-circle-o"></i>' +
        '<span class="fa fa-circle-o"></span>' +
        '<label v-text="labels[$index] || option"></label>' +
      '</span>' +
    '</span>'
})
