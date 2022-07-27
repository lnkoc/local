import addEvent from './addEvent.js'
import showEventsList from './showEventsList.js'

export default {
  components: {
    addEvent,
    showEventsList
  },
  data() {
    return {
      showAddEventForm: false,
      showEventsList: false,
      currentMenuItem: "showEventsList"
    }
  },
  emits:['logout'],
  methods: {
    addEvent() {
      this.currentMenuItem = "addEvent";
    },
    showList() {
      this.currentMenuItem = "showEventsList";
    },
    showClosedList() {

    },
    myAccount() {

    },
    logOut() {
      window.sessionStorage.clear();
      this.$emit("logout");
    },
    created() {
      this.showAddEventForm = false;
    },
  },

  template:`
    <div class="menuItems">
      <button @click="addEvent">Dodaj wydarzenie</button>
      <button @click="showList">Aktywne wydarzenia</button>
      <button @click="showClosedList">Zamknięte wydarzenia</button>
      <button @click="myAccount">Moje konto</button>
      <button @click="logOut">Wyloguj</button>
    </div>
    <div class="main">
      <component :is="currentMenuItem"></component>
    </div>
  `
}
