import vue from 'vue';

vue.directive('kf-code', function(newVal) {
    this.el.innerHTML = newVal;
    this.vm.$compile(this.el);
});
