<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="display-2 ma-6">Salas</h1>
        <SalaTable :salas="salas" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SalaTable from "@/components/SalaTable";
import { SalasService } from "@/common/api.service";

export default {
  name: "Sala",
  components: {
    SalaTable
  },
  data: () => ({
    salas: []
  }),
  methods: {
    atualizarDados() {
      SalasService.get().then(({ data }) => {
        this.salas = data;
      });
    }
  },
  created() {
    this.atualizarDados();
  }
};
</script>
