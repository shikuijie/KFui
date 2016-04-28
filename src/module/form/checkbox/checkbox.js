import _ from 'lodash';
import vue from 'vue';
import '../../code/code';
import cls from './checkbox.css.map';
import 'font-awesome';
import './checkbox.css!';
import {blur} from '../util';

/**
  @kf-comment-type  {VUE component}
  @kf-comment-name  {kf-checkbox}
  @kf-comment-how   {<kf-checkbox label="A" :model.sync="mdl" :value="val"></kf-checkbox>}
  @kf-comment-what  {label为跟在checkbox后面的标签;
                       当勾选checkbox时,将value赋值给model;
                       当取消勾选时,model的值为其原来的值}
*/
vue.component('kf-checkbox', {
  props: {
    onChange: {
      type: Function,
      default: () => {}
    },
    label: String,
    value: {
      type: null,
      default: true
    },
    model: {
      twoWay: true,
      required: true
    },
    name: String,
    required: {
      type: Boolean,
      default: false
    }
  },
  ready: function() {
    this.input = this.$el.querySelector('input');
  },
  data: function() {
    return {
      cls: cls
    };
  },
  watch: {
    model: function(val) {
      this.onChange(val);
      this.name && blur(this.input);
    }
  },
  template:
    '<span :class="cls.checkbox" class="kf-checkbox">' +
      '<input :name="name" :required="required" type="checkbox" v-model="model" :true-value="value" :false-value="false"/>' +
      '<i class="fa fa-check" :class="cls.check"></i>' +
      '<span class="fa fa-square-o" :class="cls.box"></span>' +
      '<label v-text="label || value"></label>' +
    '</span>'
});

/**
  @kf-comment-type  {VUE component}
  @kf-comment-name  {kf-checkbox-group}
  @kf-comment-how   {<kf-checkbox-group :labels="['slfslk', 'sldfe']" :model.sync="mdl" :values="[123, 345]"></kf-checkbox-group>}
  @kf-comment-what  {labels为跟在对应checkbox后面的标签;
                      当勾选一个checkbox时,values对应的值会被push到model中;
                      当取消勾选时,对应的值会被splice掉}
*/
vue.component('kf-checkbox-group', {
  props: {
    onChange: {
      type: Function,
      default: () => {}
    },
    labels: {
      type: Array,
      default: function() {
        return [];
      }
    },
    values: {
      type: Array,
      required: true
    },
    model: {
      type: Array,
      twoWay: true,
      required: true
    },
    name: String
  },
  ready: function() {
    this.inputs = this.$el.querySelectorAll('input');
  },
  data: function() {
    return {
      cls: cls,
    }
  },
  watch: {
    model: function(val) {
      let input = this.inputs[0];
      this.onChange(val);
      this.name && blur(input);
    }
  },
  template:
    '<span :class="cls.ckbgrp" class="kf-checkbox-group">' +
      '<span :class="cls.checkbox" v-for="value in values">' +
        '<input :name="name" type="checkbox" v-model="model" :value="value"/>' +
        '<i class="fa fa-check" :class="cls.check"></i>' +
        '<span class="fa fa-square-o" :class="cls.box"></span>' +
        '<label v-text="labels[$index] || value"></label>' +
      '</span>' +
    '</span>'
});
