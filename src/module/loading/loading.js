import vue from 'vue';
import './loading.css!';
import cls from './loading.css.map';

vue.component('kf-loading',{
  props:{
    loadingShow: {
      type: Boolean,
      default: false
    }
  },
  data: function(){
    return {
      cls: cls
    };
  },
  template:
    '<div :class="cls.loader" v-show="loadingShow">'+
      '<div :class="cls.ball">'+
        '<div v-for="l in [0,1,2,3,4,5,6,7]"></div>'+
      '</div>'+
    '</div>'
});
