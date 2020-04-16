<template>
  <div>
    <h2 class="display-1 ma-2">Formulário</h2>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="evento.nome" :counter="30" :rules="regrasNome" label="Nome" required></v-text-field>
      <v-textarea
        v-model="evento.descricao"
        :counter="200"
        :rules="regrasDescricao"
        label="Descricao"
      ></v-textarea>
      <v-select
        v-model="evento.salaId"
        :items="salas"
        :rules="[v => !!v || 'Campo obrigatório']"
        label="Sala"
        required
        item-text="nome"
        item-value="id"
      ></v-select>
      <v-select
        v-model="evento.responsavelId"
        :items="responsaveis"
        :rules="[v => !!v || 'Campo obrigatório']"
        label="Responsável"
        required
        item-text="nome"
        item-value="id"
      ></v-select>
      <VueCtkDateTimePicker
        v-model="evento.inicio"
        format="YYYY-MM-DD HH:mm"
        label="Selecione a data de início"
        :min-date="minDateInicio"
        :max-date="maxDateInicio"
        @formatted-value="atualizaDataFim"
        :no-button-now="true"
        id="inicio"
      />
      <br />
      <VueCtkDateTimePicker
        v-model="evento.fim"
        format="YYYY-MM-DD HH:mm"
        label="Selecione a data de término"
        :min-date="minDateFim"
        :no-button-now="true"
        id="fim"
        @formatted-value="atualizaDataInicio"
      />
      <br />
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="salvar">Salvar</v-btn>
      <v-btn class="mr-4" @click="limparDados">Cancelar</v-btn>
    </v-form>
    <v-snackbar
      v-model="exibeNotificacao"
      :top="true"
      :color="estiloNotificacao"
      :multi-line="true"
    >
      {{alertObject}}
      <v-btn color="white" text @click="exibeNotificacao = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import {
  EventosService,
  SalasService,
  ResponsaveisService
} from "../common/api.service";
import * as moment from "moment";

export default {
  name: "EventoForm",
  components: {},
  props: ["evento"],
  data: () => ({
    exibeNotificacao: false,
    alertObject: {},
    estiloNotificacao: "success",
    valid: true,
    salas: [],
    responsaveis: [],
    maxDateInicio: '',
    minDateInicio: moment().format("YYYY-MM-DD HH:mm"),
    minDateFim: moment()
      .add(30, "minutes")
      .format("YYYY-MM-DD HH:mm"),
    regrasNome: [
      v => !!v || "O campo Nome é obrigatório",
      v => (v && v.length <= 30) || "O nome deve conter até 30 caracteres"
    ],
    regrasDescricao: [
      v => {
        if (!v) 
          return true
          
        return v.length <= 200 || "A descrição deve conter até 200 caracteres"
  
      }
    ],
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    timeProps: {
      ampmInTitle: true
    },
    textFieldProps: {
      appendIcon: "mdi-calendar"
    }
  }),
  methods: {
    limparDados() {
      this.minDateInicio = moment().format("YYYY-MM-DD HH:mm"),
      this.minDateFim= moment().add(30, "minutes").format("YYYY-MM-DD HH:mm")
      this.$refs.form.reset();
      this.$parent.evento = {};
    },
    salvar() {
      if (this.evento.id) {
        EventosService.update(this.evento.id, {
          nome: this.evento.nome,
          descricao: this.evento.descricao,
          responsavelId: this.evento.responsavelId,
          salaId: this.evento.salaId,
          inicio: this.evento.inicio,
          fim: this.evento.fim
        })
          .then(({ data }) => {
            this.alertObject = data.message;
            this.exibeNotificacao = true;
            this.estiloNotificacao = "success";
            this.limparDados();
            this.$parent.atualizarDados();
          })
          .catch(error => {
            this.alertObject = error.response.data.message;
            this.exibeNotificacao = true;
            this.estiloNotificacao = "error";
          });
      } else {
        EventosService.create({
          nome: this.evento.nome,
          descricao: this.evento.descricao,
          responsavelId: this.evento.responsavelId,
          salaId: this.evento.salaId,
          inicio: this.evento.inicio,
          fim: this.evento.fim
        })
          .then(({ data }) => {
            this.alertObject = data.message;
            this.exibeNotificacao = true;
            this.estiloNotificacao = "success";
            this.limparDados();
            this.$parent.atualizarDados();
          })
          .catch(error => {
            this.alertObject = error.response.data.message;
            this.exibeNotificacao = true;
            this.estiloNotificacao = "error";
          });
      }
    },
    atualizaDataFim() {
      this.minDateFim = moment(this.$parent.evento.inicio)
        .add(30, "minutes")
        .format("YYYY-MM-DD HH:mm");
    },
    atualizaDataInicio() {
      if ((this.evento.inicio === undefined || this.evento.inicio === '') || (this.evento.fim === undefined || this.evento.fim === ''))
        return

      this.maxDateInicio = moment(this.$parent.evento.fim)
        .subtract(30, "minutes")
        .format("YYYY-MM-DD HH:mm");
    }
  },
  created() {
    ResponsaveisService.get().then(({ data }) => {
      this.responsaveis = data;
    });
    SalasService.query({ params: { somenteAtiva: true } }).then(({ data }) => {
      this.salas = data;
    });
  }
};
</script>
