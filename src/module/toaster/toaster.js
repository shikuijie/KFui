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
    toaster: {
      type: Object,
      required: true
    },
    delay: {
      type: Number,
      default: 5000
    }
  },
  data: function() {
    vue.set(this.toaster, '__TOASTS', []);
    this.toaster.__DELAY = this.delay;
    return {
      cls: cls
    }
  },
  computed: {
    toasts: function() {
      return this.toaster.__TOASTS;
    }
  },
  methods: {
    close: function(index) {
      this.__TOASTS.splice(index, 1);
    }
  },
  template:
		'<ul :class="cls.tips">' +
	    '<li v-for="t in toasts" :class="cls.item" transition="kf-toaster-fade">' +
		    '<div v-if="t.success" :class="cls.success">' +
			    '<i class="fa fa-check-circle" :class="cls.icon"></i>' +
          '<span v-text="t.tip"></span>' +
			    '<i class="fa fa-close" :class="cls.close" @click="close($index)"></i>' +
		    '</div>' +
		    '<div v-else :class="cls.error">' +
			    '<i class="fa fa-times-circle" :class="cls.icon"></i>' +
          '<span v-text="t.tip"></span>' +
			    '<i class="fa fa-close close" :class="cls.close" @click="close($index)"></i>' +
		    '</div>' +
	    '</li>' +
    '</ul>'
});

function show(toaster, msg, ok) {
  toaster.__TOASTS.unshift({tip: msg, success: ok});
  setTimeout(function() {
    toaster.__TOASTS.pop();
  }, toaster.__DELAY);
}

export default {
  succeed: function(toaster, msg) {
    show(toaster, msg, true);
  },
  fail: function(toaster, msg) {
    show(toaster, msg, false);
  }
}
