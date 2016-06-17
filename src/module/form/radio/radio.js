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
    value: null,
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
  compiled: function() {
    this.input = this.$el.querySelector('input');
    this.input.__mkfParent = this;
    this.$on('kf.form.init', function(init) {
      this.value = init;
    });
  },
  ready: function() {
    this.$on('kf.form.reset', function(val) {
      this.value = val;
    });
  },
  watch: {
    value: function(val) {
      this.onChange(val, this.name);
      this.input.__mkfBus && this.input.__mkfBus.$emit('kf.form.change', this.input, val);
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
