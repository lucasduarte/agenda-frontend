<template>
  <div>
    <v-sheet
      tile
      height="54"
      color="grey lighten-3"
      class="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="formato do calendário"
        item-text="tipo"
        item-value="type"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="800">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="eventos"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import { EventosService } from "../common/api.service";

export default {
  name: "Calendario",
  data: () => ({
    type: "month",
    types: [
      { type:"month", tipo: "Mês" }, 
      { type:"week", tipo: "Semana" }, 
      { type:"day", tipo: "Dia"}
    ],
    mode: "stack",
    weekday: [0, 1, 2, 3, 4, 5, 6],
    value: "",
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    eventos: []
  }),
  methods: {
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    },
    atualizarDados() {
      EventosService.get().then(({ data }) => {
        this.eventos = data.map(evento => {
          return {
            name: `Evento: ${evento.nome} Sala: ${evento.sala.nome}`,
            start: this.$moment(evento.inicio).format('YYYY-MM-DD HH:mm'),
            end: this.$moment(evento.fim).format('YYYY-MM-DD HH:mm'),
            color: this.colors[this.rnd(0, this.colors.length - 1)]
          };
        });
      });
    }
  },
  created() {
    this.atualizarDados();
  }
};
</script>
