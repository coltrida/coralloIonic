<template>
  <ion-content class="ion-padding">
    <SchedaComponent v-if="showScheda" @mostraDettagli="mostraDettagli" id="2"/>
    <DettaglioComponent :idEse="idEsercizio" v-else @mostraScheda="mostraScheda"/>
  </ion-content>
</template>

<script>
import SchedaComponent from "@/components/scheda/SchedaComponent";
import DettaglioComponent from "@/components/esercizi/DettaglioComponent";
import {IonContent} from "@ionic/vue";
export default {
  name: "SchedaContainer",
  components: {SchedaComponent, IonContent, DettaglioComponent},
  data(){
    return {
      showScheda: true,
      idEsercizio:0
    }
  },
  methods:{
    mostraDettagli($id){
      this.idEsercizio = $id;
      this.showScheda = false;
    },
    mostraScheda(){
      this.showScheda = true;
    }
  }
}
</script>

<style scoped>

</style>