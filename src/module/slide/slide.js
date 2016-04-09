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
    },
    size: {
      type: Number
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
    },
    size: function(newVal) {
      resize(this, newVal);
    }
  },
  ready: function() {
    resize(this);
  },
  template:
    '<div :class="cls.circle">' +
      '<div :style="containerStyle">' +
        '<slot></slot>' +
      '</div>' +
    '</div>'
});

function resize(self, newVal) {
  if(!_.isUndefined(newVal) && newVal <= 0) return;

  let items = self.$el.children[0].children,
      itemSize = (self.axis == 'x') ? items[0].offsetHeight : items[0].offsetWidth;

  self.itemsCount = items.length;
  if(!_.isUndefined(newVal) && self.itemsCount != newVal) {
    throw '指定的size和真实的元素个数不一致！';
  }

  self.zDist = itemSize/2/Math.tan(Math.PI/self.itemsCount);
  let transform = 'translateZ(-' + self.zDist + 'px) ';
  if(self.axis == 'x') {
    transform += 'rotateX(' + (-self.current * 360 / self.itemsCount) + 'deg)';
  } else {
    transform += 'rotateY(' + (-self.current * 360 / self.itemsCount) + 'deg)';
  }
  self.containerStyle.transform = transform;

  _.forEach(items, function(item, i) {
    let transform = 'translateZ(' + self.zDist + 'px)';
    if(self.axis == 'x') {
      transform = 'rotateX(' + (i * 360 / self.itemsCount) + 'deg) ' + transform;
    } else if(self.axis == 'y') {
      transform = 'rotateY(' + (i * 360 / self.itemsCount) + 'deg) ' + transform;
    }

    item.style.transform = transform;
  });
}
