import _ from 'lodash';
import vue from 'vue';
import '../../code/code';
import cls from './checkbox.css.map';
import 'font-awesome';
import './checkbox.css!';

function blur(elem) {
  let event = new FocusEvent('blur');
  elem.dispatchEvent(event);
}

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
    value: {},
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
    value: function(val) {
      this.onChange(this.name && this.name || val, this.name && val);
      this.name && blur(this.input);
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
    value: {},
    name: String
  },
  ready: function() {
    this.inputs = this.$el.querySelectorAll('input');
  },
  data: function() {
    return {
      cls: cls,
    };
  },
  watch: {
    value: function(val) {
      let input = this.inputs[0];
      this.onChange(this.name && this.name || val, this.name && val);
      this.name && blur(input);
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
