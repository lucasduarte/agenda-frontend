<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="display-2 ma-6">Eventos</h1>
        <EventoTable :eventos="eventos" @editarEventoEmitter="editarEvento"/>
      </v-col>
      <v-col>
        <EventoForm :evento="evento"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventoForm from "@/components/EventoForm";
import EventoTable from "@/components/EventoTable";
import { EventosService } from "@/common/api.service";

export default {
  name: "Evento",
  components: {
    EventoForm,
    EventoTable
  },
  data: () => ({
    eventos: [],
    evento: {}
  }),
  methods: {
    atualizarDados() {
      EventosService.get().then(({ data }) => {
        this.eventos = data;
      });
    },
    editarEvento(evento) {
      this.evento = { ...evento };
    }
  },
  created() {
    this.atualizarDados();
  }
};
</script>
