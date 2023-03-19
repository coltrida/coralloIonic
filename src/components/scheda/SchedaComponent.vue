<template>
  <ion-grid>
    <ion-row class="ion-justify-content-between">
      <ion-col size="6">
        <ion-button expand="full" size="large" @click="indietro(-1)">Sett. Prec.</ion-button>
      </ion-col>
      <ion-col size="6">
        <ion-button expand="full" size="large" @click="avanti(1)">Sett. Succ.</ion-button>
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

  <ion-card class="ion-text-center ion-margin-top" v-if="carica">
    <ion-spinner name="crescent"></ion-spinner>
  </ion-card>
  <ion-card v-else>
    <ion-card-header>
      <ion-select interface="popover" class="ion-padding" style="width: 100%" v-model="giornoSelezionato"
                  @ionChange="cambiaGiorno">
        <ion-select-option v-for="ele in giorniDiAllenamentoSelezionabili" :key="ele.id">
          {{ ele.giorno }}
        </ion-select-option>
      </ion-select>
    </ion-card-header>
    <ion-card-content class="ion-no-margin ion-no-padding">
      <ion-card v-for="(all, index) in giornoAllenamento" :key="all" class="ion-no-margin elementi">
        <ion-card-header @click="$emit('mostraDettagli', all.esercizio_id)" style="background: #ff0000">
          <ion-card-title >{{ all.esercizio.nome }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-card-subtitle><h1>Serie: {{ all.serie }}</h1></ion-card-subtitle>
                <ion-card-subtitle><h1>Rip.: {{ all.ripetizioni }}</h1></ion-card-subtitle>
              </ion-col>
              <ion-col>
                <ion-item fill="outline">
                  <ion-label position="stacked">Peso</ion-label>
                  <ion-input type="number" @keyup="salvaPeso(all.id, index)" v-model="peso[index]"></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-card-content>
  </ion-card>

</template>

<script>

import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonSpinner,
  IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption
} from "@ionic/vue";
import Echo from "laravel-echo";
import axios from "axios";

export default {
  name: "SchedaComponent",
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonSpinner,
    IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption
  },
  props: ['id'],
  data() {
    return {
      giorniDiAllenamentoSelezionabili: [],
      nrSettimane: 0,
      settimanaAttuale: 0,
      settimane: [],
      peso: [],
      giornoSelezionato: '',
      giornoDiOggi: '',
      giornoAllenamento: {},
      carica:true
    }
  },
  mounted() {
    //------- in ascolto di nuove schede o modifiche --------//
    const echo = new Echo({broadcaster: 'pusher', key: '29024fb20b8c0948a154', cluster: 'eu',});
    const channel = echo.channel('esercizioChannel');
    channel.listen('.esercizio-evento', () => {
      this.caricaDati();
    });

    //------- calcoliamo il nome del giorno di oggi -------//
    let giorno = new Date();
    let weekdays = new Array(6);
    weekdays[0] = "lunedi";
    weekdays[1] = "martedi";
    weekdays[2] = "mercoledi";
    weekdays[3] = "giovedi";
    weekdays[4] = "venerdi";
    weekdays[5] = "sabato";
    this.giornoDiOggi = weekdays[giorno.getDay() - 1];

    //------------ carichiamo i dati della scheda ------------//
    this.caricaDati();
  },
  methods: {
    async caricaDati() {
      await axios
          .get('https://www.coltricat.eu/api/cliente/' + this.id)
          .then((response) => {
            //----------------- carichiamo le settimane di allenamenti -----------------//
            this.settimane = response.data.schedallenamento.length > 0 ? response.data.schedallenamento[0].settimanallenamento : [];

            //------------- carica i giorni di allenamento della scheda per la select ---------------------//
            this.giorniDiAllenamentoSelezionabili = this.settimane.length > 0 ? this.settimane[this.settimanaAttuale].giorniallenamento : [];

            //------------------ carichiamo il numero di settimane di allenamenti --------//
            this.nrSettimane = this.settimane.length;

            //------- vediamo se oggi è un giorno presente nelle giornate di allenamento della settimana -----//
            if (this.settimane.length > 0) {
              const isFound = this.settimane[this.settimanaAttuale].giorniallenamento.some(element => {
                if (element.giorno === this.giornoDiOggi) {
                  return true;
                }
                return false;
              });

              // ---- se oggi è un giorno di allenamento selezioni il giorno nel menu a tendina e carichi il relativo allenamento ---- //
              if (isFound) {
                this.giornoSelezionato = this.giornoDiOggi;
                this.giornoAllenamento = this.settimane[this.settimanaAttuale]
                    .giorniallenamento.find(ele => ele.giorno === this.giornoDiOggi).allenamenti;
              } else {

                // ---- se oggi non è un giorno di allenamento selezioni il primo giorno di allenamento nel menu
                // a tendina e carichi il relativo allenamento ---- //
                this.giornoAllenamento = this.settimane[this.settimanaAttuale]
                    .giorniallenamento[0].allenamenti;
                this.giornoSelezionato = this.settimane[this.settimanaAttuale]
                    .giorniallenamento[0].giorno;
              }
              this.peso = this.giornoAllenamento.map(a => a.peso);

            }

            this.carica = false

          })
    },

    async salvaPeso(id, index) {
      let payload = {
        'allenamentoId':id,
        'peso': this.peso[index]
      }
      await axios
          .patch('https://www.coltricat.eu/api/salvaPeso', payload)
          .then(() => {
              this.giornoAllenamento[index].peso = this.peso[index]
          })
    },

    cambiaGiorno() {
      this.giornoAllenamento = this.settimane[this.settimanaAttuale] ? this.settimane[this.settimanaAttuale]
          .giorniallenamento.find(ele => ele.giorno === this.giornoSelezionato).allenamenti : [];
      this.peso = this.giornoAllenamento.map(a => a.peso);
    },

    avanti(direzione) {
      if (this.settimanaAttuale !== this.nrSettimane - 1) {
        this.settimanaAttuale += direzione;
        this.giornoAllenamento = this.settimane[this.settimanaAttuale]
            .giorniallenamento.find(ele => ele.giorno === this.giornoSelezionato).allenamenti;
        this.peso = this.giornoAllenamento.map(a => a.peso);
      }
    },
    indietro(direzione) {
      if (this.settimanaAttuale !== 0) {
        this.settimanaAttuale += direzione;
        this.giornoAllenamento = this.settimane[this.settimanaAttuale]
            .giorniallenamento.find(ele => ele.giorno === this.giornoSelezionato).allenamenti;
        this.peso = this.giornoAllenamento.map(a => a.peso);
      }
    }
  },
}
</script>

<style scoped>

ion-select::part(text) {
  color: #545ca7;
  font-size: 40px;
  border: 1px solid red;
  border-radius: 5px;
  padding: 10px;
  box-shadow: black 4px 4px 4px;
}

.elementi {
  border: 3px solid white;
  margin-top: 5px;
}
</style>