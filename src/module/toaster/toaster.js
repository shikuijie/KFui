import vue from 'vue';
import './toaster.css!';
import 'font-awesome';
import cls from './toaster.css.map';

vue.transition('kf-toaster-fade', {
  enterClass: cls.show,
  leaveClass: cls.hide
});

vue.component('kf-toaster', {
  props: {
    data: {
      type: Object,
			required: true
    },
    delay: {
      type: Number
    }
  },
  watch: {
    'data': {
      handler: function(n, o) {
        this.objs.unshift(n.dataObj);
        var self = this;
        if(!this.delay){
          return;
        }
        setTimeout(function() {
          self.objs.pop();
        }, this.delay);
      },
			deep: true
    }
  },
  data: function() {
    return {
      objs: [],
      cls: cls
    }
  },
  methods: {
    close: function(index) {
      this.objs.splice(index, 1);
    }
  },
  template:
		'<ul :class="cls.tips">' +
	    '<li v-for="obj in objs" :class="cls.item" transition="kf-toaster-fade">' +
		    '<div v-if="obj.success" :class="cls.success">' +
			    '<i class="fa fa-check-circle" :class="cls.icon"></i>' +
			    '{{obj.tip}}' +
			    '<i class="fa fa-close" :class="cls.close" @click="close($index)"></i>' +
		    '</div>' +
		    '<div v-else :class="cls.error">' +
			    '<i class="fa fa-times-circle" :class="cls.icon"></i>' +
			    '{{obj.tip}}' +
			    '<i class="fa fa-close close" :class="cls.close" @click="close($index)"></i>' +
		    '</div>' +
	    '</li>' +
    '</ul>'
});

export default {
  add: function(obj, data){
    vue.set(obj,'dataObj',data);
  }
}
