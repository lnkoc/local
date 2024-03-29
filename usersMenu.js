import showAllEvents from './showAllEventsList.js'

export default {
  components: {
    showAllEvents
  },
  emits:["logout"],
  data() {
    return {

    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$emit("logout");
    }
  },
  template:`
  <div class="menuUserItems">
    <button>Wydarzenia</button>
    <button>Moje konto</button>
    <button @click="logout">Wyloguj</button>
  </div>
  <div class="userEvents">
    <showAllEvents></showAllEvents>
  </div>

  `
}
