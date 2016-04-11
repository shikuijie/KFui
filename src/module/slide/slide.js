import vue from 'vue';
import cls from './slide.css.map';
import './slide.css!';

vue.component('kf-circle-slide', {
  props: {
    axis: {
      type: String,
      required: true
    },
    current: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      cls: cls,
      containerStyle: {transform: ''}
    };
  },
  watch: {
    current: function(newVal) {
      if(this.axis == 'x') {
        this.containerStyle.transform = 'translateZ(-' + this.zDist + 'px)' + ' rotateX(' + (-this.current * 360 / this.itemsCount) + 'deg)';
      } else {
        this.containerStyle.transform = 'translateZ(-' + this.zDist + 'px)' + ' rotateY(' + (-this.current * 360 / this.itemsCount) + 'deg)';
      }
    }
  },
  ready: function() {
    let self = this;
    let items = self.$el.children[0].children,
        itemSize = (self.axis == 'x') ? items[0].offsetHeight : items[0].offsetWidth;

    self.itemsCount = items.length;
    self.zDist = itemSize/2/Math.tan(Math.PI/self.itemsCount);
    let transform = 'translateZ(-' + self.zDist + 'px) ';
    if(self.axis == 'x') {
      transform += 'rotateX(' + (-self.current * 360 / self.itemsCount) + 'deg)';
    } else {
      transform += 'rotateY(' + (-self.current * 360 / self.itemsCount) + 'deg)';
    }
    self.containerStyle.transform = transform;
  },
  template:
    '<div :class="cls.circle">' +
      '<div :style="containerStyle">' +
        '<slot></slot>' +
      '</div>' +
    '</div>'
});
