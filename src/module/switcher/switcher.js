import 'font-awesome';
import vue from 'vue';
import './switcher.css!';
import styles from './switcher.css.map';

vue.component('kf-switcher', {
    props: {
        on: {
            type: Boolean,
            twoWay: true
        }
    },
    template:
        '<div :class="styles.switcher" :kf-switcher-on="on" :kf-switcher-off="!on">' +
            '<div :class="styles.on" @click="switchOff()">' +
              '<slot name="on"></slot>' +
            '</div>' +
            '<div :class="styles.off" @click="switchOn()">' +
              '<slot name="off"></slot>' +
            '</div>' +
        '</div>',
    data: function() {
        return {
            state: this.on ? styles.on : styles.off,
            styles: styles,
        };
    },
    methods: {
        switchOn: function() {
            this.state = styles.on;
            this.on = true;
        },
        switchOff: function() {
            this.state = styles.off;
            this.on = false;
        }
    }
});
