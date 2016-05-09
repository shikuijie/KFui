import vue from 'vue';
import './toaster.css!';
import cls from './toaster.css.map';

vue.transition('fade', {
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut'
});

vue.component('kf-toaster', {
  props: {
    tipData: {
      type: Object,
			required: true
    },
    tipDelay: {
      type: Number,
      default: 5000
    }
  },
  watch: {
    'tipData': {
      handler: function(n, o) {
				console.log(n);
        this.tipObjs.unshift(n.tipDataObj);
        var self = this;
        setTimeout(function() {
          self.tipObjs.pop();
        }, this.tipDelay);
      },
			deep: true
    }
  },
  data: function() {
    return {
      tipObjs: [],
      cls: cls
    }
  },
  methods: {
    close: function(index) {
      this.tipObjs.splice(index, 1);
    }
  },
  template:
		'<ul :class="cls.tips">' +
	    '<li v-for="obj in tipObjs" :class="cls.tipItem" class="animated" transition="fade">' +
		    '<div v-if="obj.success" :class="cls.success">' +
			    '<i class="fa fa-check-circle"></i>' +
			    '{{obj.tip}}' +
			    '<a href="javascript:;" class="fa fa-close" :class="cls.close" @click="close($index)"></a>' +
		    '</div>' +
		    '<div v-else :class="cls.error">' +
			    '<i class="fa fa-times-circle"></i>' +
			    '{{obj.tip}}' +
			    '<a href="javascript:;" class="fa fa-close" :class="cls.close" @click="close($index)"></a>' +
		    '</div>' +
	    '</li>' +
    '</ul>'
});

export default {
  addTip: function(obj){
		vue.set(this,'tipDataObj',obj);
  }
};
