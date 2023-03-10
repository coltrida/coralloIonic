<template>
  <ion-card>
    <ion-button expand="full" @click="$emit('mostraScheda')">Indietro</ion-button>
    <img alt="foto" :src="calcolaLink" class="ion-margin-top" />
    <ion-card-header>
      <ion-card-title>{{esercizio.nome}}</ion-card-title>
      <ion-card-subtitle>{{esercizio.muscoli}}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{esercizio.descrizione}}
    </ion-card-content>
  </ion-card>
</template>

<script>
import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton} from "@ionic/vue";
import axios from "axios";
export default {
  name: "DettaglioComponent",
  components:{IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton},
  props:['idEse'],
  data(){
    return {
      esercizio: {}
    }
  },
  mounted() {
    this.caricaDati();
  },
  methods:{
    async caricaDati() {
      await axios
          .get('http://corallo.test/api/esercizio/' + this.idEse)
          .then((response) => {
            this.esercizio = response.data;
          })
    },
  },
  computed:{
    calcolaLink() {
      return this.esercizio.linkFoto ? 'http://corallo.test/storage/' + this.esercizio.linkFoto : 'https://ionicframework.com/docs/img/demos/thumbnail.svg'
    }
  }

}
</script>

<style scoped>

</style>