<template>
  <ion-content class="ion-padding">
    <h3>Settimane di allenamento: {{ settimane }}</h3>
    <ion-list>
      <ion-card v-for="ele in scheda" :key="ele.id">
        <ion-card-header>
          <ion-badge color="success">
            <ion-card-title>{{ ele.giorno }}</ion-card-title>
          </ion-badge>
        </ion-card-header>

        <ion-card-content>
          <ion-card v-for="all in ele.allenamenti" :key="all">
            <ion-card-header>
                <ion-card-title>{{ all.esercizio.nome }}</ion-card-title>
            </ion-card-header>
                 <ion-card-content>
                    <ion-card-subtitle>Serie: {{all.serie}}</ion-card-subtitle>
                    <ion-card-subtitle>Ripetizioni: {{all.ripetizioni}}</ion-card-subtitle>
                 </ion-card-content>
          </ion-card>
        </ion-card-content>
      </ion-card>

    </ion-list>
  </ion-content>
</template>

<script>
import axios from 'axios'
import Echo from 'laravel-echo'
import {IonContent, IonList, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonBadge, IonCardSubtitle} from "@ionic/vue";

export default {
  name: "SchedaContainer",
  components: {IonContent, IonList, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonBadge, IonCardSubtitle},
  data() {
    return {
      scheda: [],
      settimane: 0,
      id: ''
    }
  },
  mounted() {
    this.id = 2;

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
          .get('http://corallo.test/api/cliente/' + this.id)
          .then((response) => {
            this.scheda = response.data.schedallenamento[0].settimanallenamento[0].giorniallenamento;
            this.settimane = response.data.schedallenamento[0].settimanallenamento.length;
          })
    },
  },
}
</script>

<style scoped>

</style>