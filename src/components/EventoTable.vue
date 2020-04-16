<template>
  <div>
    <v-data-table :headers="headers" :items="eventos" :items-per-page="10" class="elevation-1">
      <template v-slot:item.sala="{ item } ">{{ item.sala.nome }}</template>
      <template v-slot:item.responsavel="{ item } ">{{ item.responsavel.nome }}</template>
      <template v-slot:item.inicio="{ item } ">{{ item.inicio | moment("DD/MM/YYYY HH:mm") }}</template>
      <template v-slot:item.fim="{ item } ">{{ item.fim | moment("DD/MM/YYYY HH:mm") }}</template>
      <template v-slot:item.acoes="{ item } ">
        <v-row justify="center">
          <v-icon small color="grey" dark class="mr-2" @click="$emit('editarEventoEmitter', item)">mdi-pencil</v-icon>
          <v-dialog v-model="confirmacao" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-icon color="error" small v-on="on">mdi-delete</v-icon>
              
            </template>
            <v-card>
              <v-card-title class="headline">Tem certeza?</v-card-title>
              <v-card-text>
                O evento
                <strong>"{{item.nome}}"</strong> será excluido permanentemente.
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="darken-1" text @click="confirmacao = false">Cancelar</v-btn>
                <v-btn color="error darken-1" text @click="excluirEvento(item.id)">Confirmar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { EventosService } from "@/common/api.service";

export default {
  name: "EventoTable",
  props: ["eventos"],
  data() {
    return {
      confirmacao: false,
      headers: [
        {
          text: "Nome",
          align: "start",
          sortable: true,
          value: "nome"
        },
        {
          text: "Sala",
          value: "sala"
        },
        {
          text: "Responsável",
          value: "responsavel"
        },
        {
          text: "Início",
          value: "inicio"
        },
        {
          text: "Fim",
          value: "fim"
        },
        {
          text: "Ações",
          value: "acoes"
        }
      ]
    };
  },
  methods: {
    excluirEvento(id) {
      EventosService.destroy(id)
        .then(({ data }) => {
          this.confirmacao = false;
          this.$parent.atualizarDados();
        })
        .catch(error => {
          this.alertObject = error.response.data.message;
          this.exibeNotificacao = true;
          this.estiloNotificacao = "error";
        });
    }
  }
};
</script>