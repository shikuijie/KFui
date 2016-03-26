import _ from 'lodash';
import vue from 'vue';
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
    label: String,
    value: null,
    model: {
      twoWay: true,
      type: null
    }
  },
  data: function() {
    return {
      status: this.model === this.value,
      origModel: this.model,
      cls: cls
    };
  },
  methods: {
    click: function() {
      this.status = !this.status;
      if(this.status) {
        this.model = this.value;
      } else {
        this.model = this.origModel;
      }
    }
  },
  template:
    '<span :class="cls.checkbox">' +
      '<input type="checkbox" v-model="status" @click="click()"/>' +
      '<span></span>' +
      '<i class="fa fa-check" v-show="status"></i>' +
      '<label v-kf-code="label"></label>' +
    '</span>'
});

/**
  @kf-comment-type  {VUE component}
  @kf-comment-name  {kf-checkbox-group}
  @kf-comment-how   {<kf-checkbox-group :labels="['slfslk', 'sldfe']" :model.sync="mdl" :values="[123, 345]"></kf-checkbox-group>}
  @kf-comment-what  {label为跟在checkbox后面的标签;
                      当勾选一个checkbox时,对应的value会被push到model中;
                      当取消勾选时,对应的value会被splice掉}
*/
vue.component('kf-checkbox-group', {
  props: {
    labels: Array,
    values: Array,
    model: {
      type: Array,
      twoWay: true
    }
  },
  data: function() {
    return {
      cls: cls,
    }
  },
  computed: {
    status: function() {
      var self = this;
      return _.map(self.values, function(val) {
        if(self.model.indexOf(val) != -1) {
          return true;
        } else {
          return false;
        }
      });
    }
  },
  template:
    '<span class="cls.ckbgrp">' +
      '<span :class="cls.checkbox" v-for="label in labels">' +
        '<input type="checkbox" v-model="model" :value="values[$index]"/>' +
        '<span></span>' +
        '<i class="fa fa-check" v-show="status[$index]"></i>' +
        '<label v-kf-code="label"></label>' +
      '</span>' +
    '</span>'
});
