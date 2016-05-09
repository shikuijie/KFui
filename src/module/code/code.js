import vue from 'vue';

/**
  @kf-comment-type    {自定义指令}
  @kf-comment-doWhat  {实时编译html代码}
  @kf-comment-howTo   {<div :v-kf-code="codeVar"></div>}
  @kf-comment-detail  {codeVar是父组件中的变量,应为一个html字符串,
                      也可以是任何有效的自定义标签,但是其中用到的变量必须定义在父组件的上下文中,
                      我会在父组件的上下文中编译它,并将编译生成的DOM元素插入到div中}
*/
vue.directive('kf-code', {
  update: function(newVal) {
    this.el.innerHTML = newVal;
    this.vm.$compile(this.el);
  }
});
