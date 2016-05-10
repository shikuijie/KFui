import vue from 'vue';
import './autoinput.css!';
import cls from './autoinput.css.map';
import _ from 'lodash';

vue.component('kf-autoinput', {
  props: {
    onChange: {
      type: Function,
      default: () => {}
    },
    getOptions: {
      type: Function,
      default: () => {}
    },
    value: String,
    name: String,
    required: {
      type: Boolean,
      default: false
    },
  },
  data: function() {
    return {
      items: [],
      cls: cls,
      change: _.debounce(function() {
        this.options = this.getOptions();
      }, 300),
      options: [],
      activeIndex: null
    };
  },
  ready: function() {
    this.input = this.$el.querySelector('input');
  },
  watch: {
    value: _.debounce(function(nval) {
      this.onChange(nval, this.name);
      this.input.__BUS.$emit('kf.form.change', this.input, nval);
    }, 300)
  },
  methods: {
    opreate: function(ev){
      var self = this;
      switch (ev.keyCode) {
        case 38:
          if(this.activeIndex){
            this.activeIndex--;
          }else{
            this.activeIndex = this.items.length - 1;
          }
          break;
        case 40:
          if(typeof this.activeIndex == 'number' && this.activeIndex < this.items.length - 1){
            this.activeIndex++;
          }else{
            this.activeIndex = 0;
          }
          break;
        case 13:
          this.value = this.items[this.activeIndex];
          this.items = [];
          this.activeIndex = null;
          break;
      }
    },
    choose: function(index){
      var self = this;
      this.value = this.items[index];
      this.items = [];
      this.activeIndex = null;
    },
    isActive: function(index){
      return this.activeIndex === index ? cls.active : '';
    },
    hide: function(){
      this.items = [];
    }
  },
  template:
    '<div :class="cls.autofill">'+
      '<input type="text" @input="change(value)" v-model="value" @keyup.stop.prevent="opreate($event)" autocomplete="off" :name="name" :required="required">'+
      '<div :class="cls.bg" v-show="items.length" @click="hide()"></div>'+
      '<ul :class="cls.list" v-show="items.length">'+
        '<li v-for="item in items" track-by="$index" @click="choose($index)"><span :class="isActive($index)" v-text="item"></span></li>'+
      '</ul>'+
    '</div>'
});
