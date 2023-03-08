<template>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item v-for="ele in esercizi" :key="ele.id">
        <ion-thumbnail slot="start">
          <img alt="Silhouette of a person's head" :src="calcolaLink(ele)" />
        </ion-thumbnail>
        <ion-label>{{ele.nome}}</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>

</template>

<script>
import axios from 'axios'
import Echo from 'laravel-echo'
import {IonContent, IonList, IonItem, IonThumbnail, IonLabel} from "@ionic/vue";
export default {
  name: "EserciziContainer",
  components: {IonContent, IonList, IonItem, IonThumbnail, IonLabel},
  data(){
    return{
      esercizi:[]
    }
  },
  mounted() {
    const echo = new Echo({ broadcaster: 'pusher', key: '29024fb20b8c0948a154', cluster: 'eu', });
    const channel = echo.channel('esercizioChannel');
    channel.listen('.esercizio-created',  () => {
      this.caricaDati();
    });

    this.caricaDati();
  },
  methods:{
    async caricaDati(){
      await axios
          .get('http://corallo.test/api/esercizi')
          .then((response) => {
            this.esercizi = response.data;
          })
    },

    calcolaLink(ele){
      return ele.linkFoto ? 'http://corallo.test/storage/' + ele.linkFoto : 'https://ionicframework.com/docs/img/demos/thumbnail.svg'
    }
  },
  /*computed:{
    esercizi(){
      axios
          .get('http://corallo.test/api/esercizi')
          .then((response) => {
            ris = response.data;
            return ris;
          })

    }
  }*/
}
/*Pusher.logToConsole = true;
var pusher = new Pusher('29024fb20b8c0948a154', {
  cluster: 'eu'
});*/
</script>

<style scoped>

</style>