import _ from 'lodash';
import vue from 'vue';
import '../../code/code';
import cls from './checkbox.css.map';
import 'font-awesome';
import './checkbox.css!';

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
    click: {
      type: Function,
      default: () => {}
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: null,
      required: true
    },
    model: {
      twoWay: true,
      type: null,
      required: true
    }
  },
  data: function() {
    return {
      cls: cls,
      origModel: this.model
    };
  },
  template:
    '<span :class="cls.checkbox" class="kf-checkbox">' +
      '<input type="checkbox" @click="click(value)" v-model="model" :true-value="value" :false-value="origModel"/>' +
      '<i class="fa fa-check" :class="cls.check"></i>' +
      '<span class="fa fa-square-o" :class="cls.box"></span>' +
      '<label v-text="label"></label>' +
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
    onClick: {
      type: Function,
      default: ()=>{}
    },
    labels: {
      type: Array,
      required: true
    },
    values: {
      type: Array,
      required: true
    },
    model: {
      type: Array,
      twoWay: true,
      required: true
    }
  },
  data: function() {
    return {
      cls: cls,
    }
  },
  template:
    '<span :class="cls.ckbgrp" class="kf-checkbox-group">' +
      '<span :class="cls.checkbox" v-for="label in labels">' +
        '<input type="checkbox" @click="onClick($index)" v-model="model" :value="values[$index]"/>' +
        '<i class="fa fa-check" :class="cls.check"></i>' +
        '<span class="fa fa-square-o" :class="cls.box"></span>' +
        '<label v-text="label"></label>' +
      '</span>' +
    '</span>'
});
