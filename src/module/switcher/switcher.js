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
        '<div :class="styles.switcher">' +
            '<div :class="[styles.container, state]">' +
                '<div :class="styles.on" @click="switchOff()">' +
                    '<span :class="styles.text">ON</span>' +
                    '<span :class="styles.icon"><i class="fa fa-circle"></i></span>' +
                '</div>' +
                '<div :class="styles.off" @click="switchOn()">' +
                    '<span :class="styles.text">OFF</span>' +
                    '<span :class="styles.icon"><i class="fa fa-circle"></i></span>' +
                '</div>' +
                '<br>' +
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
