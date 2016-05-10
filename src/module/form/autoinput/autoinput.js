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
    value: null,
    name: String,
    required: {
      type: Boolean,
      default: false
    },
  },
  data: function() {
    return {
      cls: cls,
      options: [],
      change: _.debounce(function(val) {
        if(val){
          this.options = this.getOptions(val);
          this.visible = true;
        }else{
          this.visible = false;
        }
        this.activeIndex = 0;
      }, 500),
      activeIndex: null,
      visible: false
    };
  },
  ready: function() {
    this.input = this.$el.querySelector('input');
  },
  watch: {
    value: _.debounce(function(nval) {
      this.onChange(nval, this.name);
      this.input.__BUS && this.input.__BUS.$emit('kf.form.change', this.input, nval);
    }, 500)
  },
  methods: {
    opreate: function(ev){
      switch (ev.keyCode) {
        case 38:
          if(!this.visible){
            this.visible = true;
            return;
          }
          if(this.activeIndex){
            this.activeIndex--;
          }else{
            this.activeIndex = this.options.length - 1;
          }
          break;
        case 40:
          if(!this.visible){
            this.visible = true;
            return;
          }
          if(typeof this.activeIndex == 'number' && this.activeIndex < this.options.length - 1){
            this.activeIndex++;
          }else{
            this.activeIndex = 0;
          }
          break;
        case 13:
          if(this.activeIndex !== null) {
            this.value = this.options[this.activeIndex];
          }
          this.visible = false;
          break;
      }
    },
    choose: function(index){
      this.value = this.options[index];
      this.activeIndex = index;
      this.visible = false;
    },
    isActive: function(index){
      return this.activeIndex === index ? 'active' : '';
    },
    showOptions: function(val){
      val && (this.visible = true);
    },
    getOptionsCls: function(){
      var res = {};
      res[cls.visible] = this.visible;
      res[cls.list] = true;
      return res;
    }
  },
  template:
    '<div :class="cls.autoinput" class="kf-autoinput">'+
      '<input type="text" @input="change(value)" v-model="value" @keyup.stop.prevent="opreate($event)" @click="showOptions(value)" autocomplete="off" :name="name" :required="required">'+
      '<div :class="cls.bg" v-show="visible" @click="visible = false"></div>'+
      '<ul :class="getOptionsCls()">'+
        '<li v-for="option in options" track-by="$index" @click="choose($index)"><span :class="isActive($index)" v-text="option"></span></li>'+
      '</ul>'+
    '</div>'
});
