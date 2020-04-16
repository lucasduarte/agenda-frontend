<template>
  <div class="home">
    <h1 class="display-2 ma-6">Calendário de Eventos</h1>
    <Calendario />
  </div>
</template>

<script>

import Calendario from '@/components/Calendario'

export default {
  name: 'Home',
  components: {
    Calendario
  },
  
}
</script>
