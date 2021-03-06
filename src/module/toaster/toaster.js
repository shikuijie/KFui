import vue from 'vue';
import './toaster.css!';
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
    vue.set(this.toaster, '__mkfToasts', []);
    this.toaster.__mkfDelay = this.delay;
    return {
      cls: cls
    }
  },
  computed: {
    toasts: function() {
      return this.toaster.__mkfToasts;
    }
  },
  methods: {
    close: function(index) {
      this.toaster.__mkfToasts.splice(index, 1);
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
			    '<i class="fa fa-exclamation-circle" :class="cls.icon"></i>' +
          '<span v-text="t.tip"></span>' +
			    '<i class="fa fa-close" :class="cls.close" @click="close($index)"></i>' +
		    '</div>' +
	    '</li>' +
    '</ul>'
});

function show(toaster, msg, ok) {
  toaster.__mkfToasts.unshift({tip: msg, success: ok});
  setTimeout(function() {
    toaster.__mkfToasts.pop();
}, toaster.__mkfDelay);
}

export default {
  info: function(toaster, msg) {
    show(toaster, msg, true);
  },
  warn: function(toaster, msg) {
    show(toaster, msg, false);
  }
}
