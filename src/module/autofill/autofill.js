import vue from 'vue';
import './autofill.css!';
import cls from './autofill.css.map';
import _ from 'lodash';

vue.component('kf-autofill', {
  props: {
    onChange: {
      type: Function,
      default: function(){}
    },
    getValue: {
      type: Function,
      default: function(){}
    },
    value: {},
    name: String,
    options: {
      type: Array,
      default: []
    }
  },
  data: function() {
    return {
      items: [],
      cls: cls,
      change: _.debounce(this.onChange, 500),
      activeIndex: null
    };
  },
  watch: {
    'options': function(n, o){
      this.items = this.options;
    }
  },
  methods: {
    opreate: function(ev){
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
          this.getValue(this.value);
          this.items = [];
          this.activeIndex = null;
          break;
      }
    },
    choose: function(index){
      this.value = this.items[index];
      this.getValue(this.value);
      this.items = [];
      this.activeIndex = null;
    },
    isActive: function(index){
      return this.activeIndex === index ? cls.active : '';
    },
    isShow: function(){
      return !!this.items.length;
    },
  },
  template:
    '<div>'+
      '<input type="text" @input="change(value)" v-model="value" @keyup.stop.prevent="opreate($event)" autocomplete="off">'+
      '<ul :class="cls.list" v-show="isShow()">'+
        '<li v-for="item in items" track-by="$index" @click="choose($index)"><a href="javasript:;" :class="isActive($index)">{{item}}</a></li>'+
      '</ul>'+
    '</div>'
});
