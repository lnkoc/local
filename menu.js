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
    }
  },
  emits:['logout'],
  methods: {
    addEvent() {
      this.showAddEventForm = true;
    },
    showList() {
      this.showEventsList = true;
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
      <addEvent v-if="showAddEventForm" @eventCreated="created"></addEvent>
      <showEventsList v-if="showEventsList"></showEventsList>
    </div>
  `
}
