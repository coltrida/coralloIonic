<template>
  <h2 class="ion-padding">Richieste</h2>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label>Testo</ion-label>
      <ion-input v-model="elemento.testo"></ion-input>
    </ion-item>
    <ion-button @click="invia()" class="ion-margin-top">Invia</ion-button>
  </ion-content>
</template>

<script>
import {IonContent, IonItem, IonLabel, IonInput, IonButton, toastController} from "@ionic/vue";
import axios from "axios";
export default {
  name: "RichiestaContainer",
  components: {IonContent, IonItem, IonLabel, IonInput, IonButton},
  data(){
    return {
      elemento:{
        'userId': 2,
        'testo': ''
      }
    }
  },
  methods:{
    invia() {
      axios
          .post('http://corallo.test/api/richiesta', this.elemento, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            }
          })
          .then((response) => {
            this.openToast(response.data);
            this.elemento.testo = '';
          })
    },

    async openToast(messaggio){
      const toast = await toastController
          .create({
            message: messaggio,
            duration: 2000,
            color: 'success'
          });
      return toast.present();
    }
  }
}
</script>

<style scoped>

</style>