import vue from 'vue';
import '../../code/code';
import './radio.css!';
import cls from './radio.css.map';

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
  data: function() {
    return {
      cls: cls
    };
  },
  ready: function() {
    this.input = this.$el.querySelector('input');
  },
  watch: {
    value: function(val) {
      this.onChange(this.name && this.name || val, this.name && val);
      this.$el.__BUS.$emit('kf.validate.change', this.$el);
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
