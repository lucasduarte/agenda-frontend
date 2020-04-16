<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="display-2 ma-6">Responsáveis</h1>
        <ResponsavelTable :responsaveis="responsaveis" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ResponsavelTable from "@/components/ResponsavelTable";
import { ResponsaveisService } from "@/common/api.service";

export default {
  name: "Responsavel",
  components: {
    ResponsavelTable
  },
  data: () => ({
    responsaveis: []
  }),
  methods: {
    atualizarDados() {
      ResponsaveisService.get().then(({ data }) => {
        this.responsaveis = data;
      });
    }
  },
  created() {
    this.atualizarDados();
  }
};
</script>
