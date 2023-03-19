<template>
  <ion-content class="ion-padding">
    <div class="ion-text-center ion-margin-top" v-if="carica">
      <ion-spinner name="crescent"></ion-spinner>
    </div>
    <div v-else>
      <ion-list>
        <ion-item v-for="ele in esercizi" :key="ele.id" @click="$emit('mostraDettagli', ele.id)">
          <ion-thumbnail slot="start">
            <img alt="foto" :src="calcolaLink(ele)" />
          </ion-thumbnail>
          <ion-label>{{ele.nome}}</ion-label>
        </ion-item>
      </ion-list>
    </div>

  </ion-content>
</template>

<script>
import axios from 'axios'
import Echo from 'laravel-echo'
import {IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonSpinner } from "@ionic/vue";
export default {
  name: "ListaComponent",
  components: {IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonSpinner},
  data() {
    return {
      carica: true,
      esercizi: []
    }
  },
  mounted() {
    const echo = new Echo({broadcaster: 'pusher', key: '29024fb20b8c0948a154', cluster: 'eu',});
    const channel = echo.channel('esercizioChannel');
    channel.listen('.esercizio-evento', () => {
      this.caricaDati();
    });

    this.caricaDati();
  },
  methods: {
    async caricaDati() {
      await axios
          .get('https://www.coltricat.eu/api/esercizi')
          .then((response) => {
            this.esercizi = response.data;
            this.carica = false
          })
    },

    calcolaLink(ele) {
      return ele.linkFoto ? 'https://www.coltricat.eu/storage/' + ele.linkFoto : 'https://ionicframework.com/docs/img/demos/thumbnail.svg'
    }
  },
}
</script>

<style scoped>

</style>