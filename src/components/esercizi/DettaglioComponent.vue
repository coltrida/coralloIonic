<template>
  <ion-card v-if="!showVideo">
    <ion-button size="large" expand="full" @click="$emit('mostraScheda')">
      <ion-icon slot="start" size="large" :icon="arrowBackCircleOutline"></ion-icon>
      Indietro
    </ion-button>
    <img alt="foto" :src="calcolaLink" class="ion-margin-top" style="width: 100%" />
    <ion-card-header>

      <ion-grid>
        <ion-row>
          <ion-col><ion-card-title>{{esercizio.nome}}</ion-card-title></ion-col>
          <ion-col>
            <ion-button size="large" expand="full" @click="playVideo" v-if="esercizio.linkVideo">
              <ion-icon slot="start" size="large" :icon="playOutline" @click="playVideo"></ion-icon>
              Play
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-card-subtitle>{{esercizio.muscoli}}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{esercizio.descrizione}}
    </ion-card-content>
  </ion-card>
  <ion-card v-else>
    <video style="width: 100%;" controls autoplay>
      <source :src="calcolaLinkVideo" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <ion-button size="large" expand="full" @click="playVideo" >
      <ion-icon slot="start" size="large" :icon="arrowBackCircleOutline"></ion-icon>
      Indietro
    </ion-button>
  </ion-card>
</template>

<script>
import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { arrowBackCircleOutline, playOutline } from 'ionicons/icons';
import axios from "axios";
export default {
  name: "DettaglioComponent",
  components:{IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonGrid, IonRow, IonCol},
  props:['idEse'],
  setup() {
    return { arrowBackCircleOutline, playOutline }
  },
  data(){
    return {
      showVideo:false,
      esercizio: {}
    }
  },
  mounted() {
    this.caricaDati();
  },
  methods:{
    async caricaDati() {
      await axios
          .get('https://www.coltricat.eu/api/esercizio/' + this.idEse)
          .then((response) => {
            this.esercizio = response.data;
          })
    },

    playVideo(){
      this.showVideo = !this.showVideo;
    }
  },
  computed:{
    calcolaLink() {
      return this.esercizio.linkFoto ? 'https://www.coltricat.eu/storage/' + this.esercizio.linkFoto : 'https://ionicframework.com/docs/img/demos/thumbnail.svg'
    },

    calcolaLinkVideo() {
      return this.esercizio.linkVideo ? 'https://www.coltricat.eu/storage/' + this.esercizio.linkVideo : 'https://ionicframework.com/docs/img/demos/thumbnail.svg'
    }
  }

}
</script>

<style scoped>

</style>