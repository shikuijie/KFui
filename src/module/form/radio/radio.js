import vue from 'vue';
import 'font-awesome';
import '../../code/code';
import './radio.css!';
import cls from './radio.css.map';

/**
  @kf-comment-type  {VUE component}
  @kf-comment-name  {kf-radio-group}
  @kf-comment-how   {<kf-radio-group :labels="['lsk', 'dfk', 'kdfe']" :model.sync="mdl" :values="[1,2,3]"></kf-radio-group>}
  @kf-comment-what  {labels为跟在radio后面的标签; 当选择某个radio时,将对应的value赋值给model}
*/
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
    '<span :class="cls.rdgrp">' +
      '<span v-for="label in labels">' +
        '<input type="radio" v-model="model" :value="values[$index]"/>' +
        '<i class="fa fa-dot-circle-o"></i>' +
        '<span class="fa fa-circle-o"></span>' +
        '<label v-text="label"></label>' +
      '</span>' +
    '</span>'
})
