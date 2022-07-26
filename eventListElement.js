export default {
  data() {
    return {

    }
  },
  props: ["eventId", "eventName", "place", "dateStart", "timeStart", "name", "surname", "dateStopRegistration", "timeStopRegistration"],
  template: `
    <div class="event">
      {{eventName}}<br>
      Miejsce: {{place}} <br>
      Organizator: {{name}} {{surname}} <br>
    </div>
  `
}
