import vue from 'vue';
import './autoinput.css!';
import cls from './autoinput.css.map';
import _ from 'lodash';

vue.component('kf-autoinput', {
  props: {
    onChange: {
      type: Function,
      default: () => {}
      /*
        function(name, val, val1) {
          console.log(name, val)
          if(name == 'range') {
            form.currentRow.start = val;
            form.currentRow.end = val1;
          } else if(name === 'name') {
            var self = this;
            if(!val) return;
            setTimeout(function(){
              self.options.push(Math.round((Math.random()*100)));
            }, 300);
            form.currentRow[name] = val;
          else {
            form.currentRow[name] = val;
          }
        }
      }
      */
    },
    value: {},
    name: String,
    options: {
      type: Array,
      default: []
    },
    required: {
      type: Boolean,
      default: false
    },
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
          this.onChange({name: self.name, value: self.value, getOpt: false});
          this.items = [];
          this.activeIndex = null;
          break;
      }
    },
    choose: function(index){
      var self = this;
      this.value = this.items[index];
      this.onChange({name: self.name, value: self.value, getOpt: false});
      this.items = [];
      this.activeIndex = null;
    },
    isActive: function(index){
      return this.activeIndex === index ? cls.active : '';
    },
    isShow: function(){
      return !!this.items.length;
    },
    hide: function(){
      this.items = [];
    }
  },
  computed: {
    valData: function(){
      var self = this;
      return {
        name: self.name,
        value: self.value,
        getOpt: true
      }
    }
  },
  template:
    '<div>'+
      '<input type="text" @input="change(valData)" v-model="value" @keyup.stop.prevent="opreate($event)" autocomplete="off" :name="name" :required="required">'+
      '<div :class="cls.bg" v-show="isShow()" @click="hide()"></div>'+
      '<ul :class="cls.list" v-show="isShow()">'+
        '<li v-for="item in items" track-by="$index" @click="choose($index)"><a href="javasript:;" :class="isActive($index)">{{item}}</a></li>'+
      '</ul>'+
    '</div>'
});
