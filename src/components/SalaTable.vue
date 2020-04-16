<template>
  <v-data-table
    :headers="headers"
    :items="salas"
    :items-per-page="10"
    class="elevation-1"
  >
    <template v-slot:item.ativa="{ item }">
      <v-simple-checkbox v-model="item.ativa" disabled></v-simple-checkbox>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: 'SalaTable',
    props: ['salas'],
    data () {
      return {
        headers: [
          {
            text: 'Nome',
            align: 'start',
            sortable: true,
            value: 'nome',
          },
          { text: 'Ativa', value: 'ativa' },
        ],
      }
    },
  }
</script>