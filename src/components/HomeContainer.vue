<template>
  <ListaComponent v-if="showLista" @mostraDettagli="mostraDettagli"/>
  <DettaglioComponent v-else :idEse="idEse" @mostraScheda="mostraScheda"/>
</template>

<script>

import ListaComponent from "@/components/esercizi/ListaComponent";
import DettaglioComponent from "@/components/esercizi/DettaglioComponent";
export default {
  name: "HomeContainer",
  components: {DettaglioComponent, ListaComponent},
  data(){
    return {
      showLista: true,
      idEse:0
    }
  },
  methods:{
    mostraDettagli(idEsercizio){
      this.idEse = idEsercizio;
      this.showLista = false;
    },
    mostraScheda(){
      this.showLista = true;
    }
  }
}

</script>

<style scoped>

</style>