<template>
  <ion-grid>
    <ion-row class="ion-justify-content-between">
      <ion-col size="6">
        <ion-button expand="full" @click="indietro(-1)">Sett. Prec.</ion-button>
      </ion-col>
      <ion-col size="6">
        <ion-button expand="full" @click="avanti(1)">Sett. Succ.</ion-button>
      </ion-col>
    </ion-row>

    <ion-row class="ion-justify-content-between">
      <ion-col size="4">
        Sett. di allenamento: {{ nrSettimane }}
      </ion-col>
      <ion-col size="4">
        Sett. attuale: {{ settimanaAttuale + 1 }}
      </ion-col>
    </ion-row>
  </ion-grid>

  <ion-list>
    <ion-card v-for="ele in scheda" :key="ele.id">
      <ion-card-header>
        <ion-badge color="success" style="width: 100%">
          <ion-card-title>{{ ele.giorno }}</ion-card-title>
        </ion-badge>
      </ion-card-header>
      <ion-card-content class="ion-no-margin ion-no-padding">
        <ion-card v-for="all in ele.allenamenti" :key="all" class="ion-no-margin">
          <ion-card-header>
            <ion-card-title  @click="$emit('mostraDettagli', all.esercizio_id)">{{ all.esercizio.nome }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-card-subtitle>Serie: {{ all.serie }}</ion-card-subtitle>
                  <ion-card-subtitle>Ripetizioni: {{ all.ripetizioni }}</ion-card-subtitle>
                </ion-col>
                <ion-col>
                  <ion-item fill="outline">
                    <ion-label position="stacked">Peso</ion-label>
                    <ion-input type="number">{{all.peso}}</ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-grid>

          </ion-card-content>
        </ion-card>
      </ion-card-content>
    </ion-card>
  </ion-list>
</template>

<script>
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonBadge,
  IonList, IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonLabel} from "@ionic/vue";
import Echo from "laravel-echo";
import axios from "axios";

export default {
  name: "SchedaComponent",
  components: {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonBadge,
    IonList, IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonLabel},
  props: ['id'],
  data() {
    return {
      scheda: [],
      nrSettimane: 0,
      settimanaAttuale: 0,
      settimane:[]
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
          .get('http://corallo.test/api/cliente/' + this.id)
          .then((response) => {
            this.scheda = response.data.schedallenamento[0].settimanallenamento[this.settimanaAttuale].giorniallenamento;
            this.nrSettimane = response.data.schedallenamento[0].settimanallenamento.length;
            this.settimane = response.data.schedallenamento[0].settimanallenamento;
          })
    },
    avanti(direzione){
      if (this.settimanaAttuale !== this.nrSettimane-1){
        this.settimanaAttuale += direzione;
        this.scheda = this.settimane[this.settimanaAttuale].giorniallenamento;
      }
    },
    indietro(direzione){
      if (this.settimanaAttuale !== 0){
        this.settimanaAttuale += direzione;
        this.scheda = this.settimane[this.settimanaAttuale].giorniallenamento;
      }
    }
  },
}
</script>

<style scoped>

</style>