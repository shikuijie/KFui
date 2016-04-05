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
        this.containerStyle.transform = 'translateZ(-' + this.zDist + 'px)' + ' rotateX(' + -this.current * 360 / this.itemsCount + 'deg)';
      } else {
        this.containerStyle.transform = 'translateZ(-' + this.zDist + 'px)' + ' rotateY(' + -this.current * 360 / this.itemsCount + 'deg)';
      }
    }
  },
  ready: function() {
    let items = this.$el.querySelectorAll('.' + cls.container + ' > *'),
        itemSize = (this.axis == 'x') ? items[0].offsetHeight : items[0].offsetWidth;

    this.itemsCount = items.length;
    this.zDist = itemSize/2/Math.tan(Math.PI/this.itemsCount);
    let transform = 'translateZ(-' + this.zDist + 'px) ';
    if(this.axis == 'x') {
      transform += 'rotateX(' + -this.current * 360 / this.itemsCount + 'deg)';
    } else {
      transform += 'rotateY(' + -this.current * 360 / this.itemsCount + 'deg)';
    }
    this.containerStyle.transform = transform;

    let self = this;
    _.forEach(items, function(item, i) {
      let transform = 'translateZ(' + self.zDist + 'px)';
      if(self.axis == 'x') {
        transform = 'rotateX(' + i*360/self.itemsCount + 'deg) ' + transform;
      } else if(self.axis == 'y') {
        transform = 'rotateY(' + i*360/self.itemsCount + 'deg) ' + transform;
      }

      item.style.transform = transform;
    });
  },
  template:
    '<div :class="cls.circle">' +
      '<div :class="cls.container" :style="containerStyle">' +
        '<slot></slot>' +
      '</div>' +
    '</div>'
});
