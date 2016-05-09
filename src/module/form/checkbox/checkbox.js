import _ from 'lodash';
import vue from 'vue';
import '../../code/code';
import cls from './checkbox.css.map';
import './checkbox.css!';

vue.component('kf-checkbox', {
  props: {
    onChange: {
      type: Function,
      default: () => {}
    },
    label: String,
    option: {
      type: null,
      default: true
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
  ready: function() {
    this.input = this.$el.querySelector('input');
  },
  watch: {
    value: function(val) {
      this.onChange(this.name && this.name || val, this.name && val);
      this.input.__BUS && this.input.__BUS.$emit('kf.form.change', this.input, val);
    }
  },
  template:
    '<span :class="cls.checkbox" class="kf-checkbox">' +
      '<input :name="name" :required="required" type="checkbox" v-model="value" :true-value="option" :false-value="false"/>' +
      '<i class="fa fa-check" :class="cls.check"></i>' +
      '<span class="fa fa-square-o" :class="cls.box"></span>' +
      '<label v-text="label"></label>' +
    '</span>'
});

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
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    name: String
  },
  data: function() {
    return {
      cls: cls,
    };
  },
  ready: function() {
    this.input = this.$el.querySelector('input');
  },
  watch: {
    value: function(val) {
      let value = [].slice.apply(val);
      this.onChange(this.name && this.name || value, this.name && value);
      this.input.__BUS && this.input.__BUS.$emit('kf.form.change', this.input, value);
    }
  },
  template:
    '<span :class="cls.ckbgrp" class="kf-checkbox-group">' +
      '<span :class="cls.checkbox" v-for="option in options">' +
        '<input :name="name" type="checkbox" v-model="value" :value="option"/>' +
        '<i class="fa fa-check" :class="cls.check"></i>' +
        '<span class="fa fa-square-o" :class="cls.box"></span>' +
        '<label v-text="labels[$index] || option"></label>' +
      '</span>' +
    '</span>'
});
