<template>
  <h2 class="ion-padding">Promozioni</h2>
  <ion-card>
    <img alt="foto" :src="calcolaLink" />
    <ion-card-header>
      <ion-card-title>{{news.titolo}}</ion-card-title>
      <ion-card-subtitle>{{news.created_at}}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{news.testo}}
    </ion-card-content>
  </ion-card>
</template>

<script>
import axios from "axios";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import Echo from "laravel-echo";
export default {
  name: "NewsContainer",
  components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
  data(){
    return {
      news: {}
    }
  },
  mounted() {
    const echo = new Echo({broadcaster: 'pusher', key: '29024fb20b8c0948a154', cluster: 'eu',});
    const channel = echo.channel('newsChannel');
    channel.listen('.news-evento', () => {
      this.caricaDati();
    });

    this.caricaDati();
  },
  methods:{
    async caricaDati() {
      await axios
          .get('http://corallo.test/api/ultimaNews/')
          .then((response) => {
            this.news = response.data;
          })
    },
  },
  computed:{
    calcolaLink() {
      return this.news.linkFoto ? 'http://corallo.test/storage/' + this.news.linkFoto : 'https://ionicframework.com/docs/img/demos/thumbnail.svg'
    }
  }
}
</script>

<style scoped>

</style>