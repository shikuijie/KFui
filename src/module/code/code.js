import vue from 'vue';
import _ from 'lodash';

vue.directive('kf-code', {
  update: function(newVal) {
    if(_.isUndefined(newVal)) {
      this.el.innerHTML = '';
    } else {
      this.el.innerHTML = newVal;
    }
    this.vm.$compile(this.el);
  }
});
