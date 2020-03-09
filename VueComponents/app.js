Vue.component("Counter", {
  data() {
    return {
      counter: 0
    };
  },
  template: `
    <div>
      <span>{{ counter }}</span>
      <button v-on:click="plusOne">Click me!</button>
    </div>
  `,
  methods: {
    plusOne() {
      this.counter += 1;
    }
  }
});

new Vue({
  el: "#app",
  data() {
    return {
      title: "Hello!"
    };
  },
  computed: {},
  watch: {},
  methods: {}
});
