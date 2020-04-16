<template>
  <v-data-table
    :headers="headers"
    :items="responsaveis"
    :items-per-page="10"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
  export default {
    name: 'ResponsavelTable',
    props: ['responsaveis'],
    data () {
      return {
        headers: [
          {
            text: 'Nome',
            align: 'start',
            sortable: true,
            value: 'nome',
          }
        ],
      }
    },
  }
</script>