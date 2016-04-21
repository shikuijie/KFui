import vue from 'vue';
import 'font-awesome';
import '../../code/code';
import './radio.css!';
import cls from './radio.css.map';

vue.component('kf-radio-group', {
  props: {
    labels: Array,
    values: Array,
    model: {
      twoWay: true,
      type: null
    }
  },
  data: function() {
    return {
      cls: cls
    };
  },
  template:
    '<span :class="cls.rdgrp" class="kf-radio-group">' +
      '<span v-for="label in labels">' +
        '<input type="radio" v-model="model" :value="values[$index]"/>' +
        '<i class="fa fa-dot-circle-o"></i>' +
        '<span class="fa fa-circle-o"></span>' +
        '<label v-text="label"></label>' +
      '</span>' +
    '</span>'
})
