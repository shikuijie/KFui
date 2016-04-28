import vue from 'vue';
import 'font-awesome';
import '../../code/code';
import './radio.css!';
import cls from './radio.css.map';
import {blur} from '../util';

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
    values: {
      type: Array,
      required: true
    },
    model: {
      twoWay: true,
      type: null
    },
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
    model: function(val) {
      this.onChange(val);
      this.name && blur(this.inputs[0]);
    }
  },
  template:
    '<span :class="cls.rdgrp" class="kf-radio-group">' +
      '<span v-for="value in values">' +
        '<input :name="name" :required="required" type="radio" v-model="model" :value="value"/>' +
        '<i class="fa fa-dot-circle-o"></i>' +
        '<span class="fa fa-circle-o"></span>' +
        '<label v-text="labels[$index] || value"></label>' +
      '</span>' +
    '</span>'
})
