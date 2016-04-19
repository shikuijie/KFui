import vue from 'vue';
import 'animate.css';
import './tab.css!';
import cls from './tab.css.map';

vue.component('kf-tab-item', {
  props: {
    label: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      cls: cls,
      pdata: this.$parent.$data
    };
  },
  watch: {
    visible: function(newVal) {
      this.pdata.titles[this.label] = newVal;

      if(newVal) return;
      _.forEach(this.pdata.titles, function(visible, title) {
        if(!visible) return;
        this.pdata.active = title;
        return true;
      });
    },
    label: function(newVal, oldVal) {
      if(this.pdata.active == oldVal) {
        this.pdata.active = newValue;
      }

      vue.set(this.pdata.titles, newVal, this.pdata.titles[oldVal]);
      delete this.pdata.titles[oldVal];
    }
  },
  created: function() {
    if(!this.pdata.active && this.visible) {
      this.pdata.active = this.label;
    }

    vue.set(this.pdata.titles, this.label, this.visible);
  },
  destroyed: function() {
    if(this.pdata.active == this.label) {
      _.forEach(this.pdata.titles, function(visible, title) {
        if(!visible) return;
        this.pdata.active = title;
        return true;
      });
    }

    delete this.pdata.titles[this.label];
  },
  template:
    '<div v-show="pdata.titles[label] && pdata.active == label">' +
      '<slot></slot>' +
    '</div>'
});

vue.component('kf-tab', {
  data: function() {
    return {
      cls: cls,
      titles: {},
      active: ''
    };
  },
  template:
    '<div :class="cls.tabs">' +
      '<ul>' +
        '<li v-for="(title, visible) in titles" ' +
            '@click="this.active = title" ' +
            ':kf-tab-active="this.active == title" ' +
            'v-show="visible" ' +
            'v-text="title"></li>' +
      '</ul>' +
      '<slot></slot>' +
    '</div>'
});
