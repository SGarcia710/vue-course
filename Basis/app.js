Vue.component("CoinDetail", {
  // props: ["changePercent", "title", "img", "name", "price"], this isnt very good when the component will receive a lot of properties.
  props: ["coin"],
  data() {
    return {
      showPrices: false,
      value: 0
    };
  },
  template: `   
    <div>
      <!-- Binding and events -->
      <img
        v-on:mouseover="toggleShowPrices"
        v-on:mouseout="toggleShowPrices"
        v-bind:src="coin.img"
        v-bind:alt="coin.name"
      />

      <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
        <!-- Computed properties are used the same way as a normal property -->
        {{ title }}

        <!-- If-else-else-if -->
        <span v-if="coin.changePercent > 0">👍🏼</span>
        <span v-else-if="coin.changePercent < 0">👎🏼</span>
        <span v-else>🤞🏼</span>

        <!-- v-show adds display:none when something doesn't wont show. Its recommended when you have a lot of time showing and hiding something, because you will avoid a lot of DOM mutations.

        <span v-show="coin.changePercent > 0">👍🏼</span>
        <span v-show="coin.changePercent < 0">👎🏼</span>
        <span v-show="coin.changePercent === 0">🤞🏼</span> -->

        <!-- v-for and v-on -->
        <span v-on:click="toggleShowPrices">
          {{ showPrices ? "🐵" : "🙈" }}
        </span>
      </h1>

      <input type="number" v-model="value" />
      <span>{{ convertedValue }}</span>

      <slot name="text"></slot>
      <slot name="link"></slot>

      <ul v-show="showPrices">
        <li
          class="uppercase"
          v-bind:class="{ orange: p.value === coin.price, red: p.value < coin.price, green: p.value > coin.price }"
          v-for="(p, i) in coin.pricesWithDays"
          v-bind:key="p.day"
        >
          {{ i + 1}}. {{ p.day }} - {{ p.value }}
        </li>
      </ul>
    </div>
    
  `,
  methods: {
    toggleShowPrices() {
      this.showPrices = !this.showPrices;

      // Everytime our component runs this function, it will emmit to the parent component "change-color" event. The second parameter of this function($emit) will be a value to send to the parent component.
      this.$emit("change-color", this.showPrices ? "FF96C8" : "3D3D3D");
    }
  },
  computed: {
    title() {
      // The computed properties are calculated in real time depending on properties.

      // This Computed property will be excecuted everytime this.name or this.symbol changes
      return `${this.coin.name} - ${this.coin.symbol}`;
    },
    convertedValue() {
      if (!this.value) {
        return 0;
      }
      return this.value / this.coin.price;
    }
  }
});

new Vue({
  el: "#app",
  data() {
    return {
      btc: {
        name: "Bitcon",
        symbol: "BTC",
        img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        changePercent: 0,
        price: 5123,
        pricesWithDays: [
          { day: "Monday", value: 8400 },
          { day: "Martes", value: 1212 },
          { day: "Miercoles", value: 9500 },
          { day: "Jueves", value: 5123 },
          { day: "Friday", value: 2919 },
          { day: "Sábado", value: 9000 },
          { day: "Sunday", value: 3919 }
        ]
      },
      color: "f4f4f4"
    };
  },
  created() {
    console.log("El componente app fue creado");
    // Here we dont have access to the DOM.
    // Its good to get information from an API
  },
  mounted() {
    console.log("El componente app fue montado");
    // Here we already can access to the DOM.
  },
  computed: {},
  watch: {
    showPrices(newValue, oldValue) {
      // A watcher needs to be named as a property of your application. It will be excecuted everytime the property changes. It always receive the newValue and the oldValue.
      console.log(newValue, oldValue);
    }
  },
  methods: {
    updateColor(color) {
      // Color comes from the child component emiting change-color
      this.color =
        color ||
        this.color
          .split("")
          .reverse()
          .join("");
    }
  }
});
