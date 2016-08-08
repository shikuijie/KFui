import vue from 'vue';
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
  template:
    '<div v-show="pdata.titles[label] && pdata.active == label">' +
      '<slot></slot>' +
    '</div>'
});

vue.component('kf-tab', {
  props: {
    onSwitch: {
      type: Function,
      default: function() {}
    },
    current: null 
  },
  data: function() {
    return {
      cls: cls,
      titles: {},
      active: this.current
    };
  },
  methods: {
    onSwitchTab: function(title) {
      if(title === this.active) return;
      
      this.onSwitch(title, this.active);
      this.active = title;
    }
  },
  watch: {
    current: function(nval) {
      if(_.isObject(nval) && !Object.keys(nval).length) return;
      this.active = nval;
    }
  },
  template:
    '<div :class="cls.tabs" class="kf-tab">' +
      '<ul>' +
        '<li v-for="(title, visible) in titles" ' +
            '@click="onSwitchTab(title)" ' +
            ':kf-tab-active="active == title" ' +
            'v-show="visible" ' +
            'v-text="title"></li>' +
      '</ul>' +
      '<slot></slot>' +
    '</div>'
});
