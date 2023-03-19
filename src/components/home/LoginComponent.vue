<template>
  <h2 class="ion-padding">Login</h2>
  <form>
    <ion-item>
      <ion-label position="floating">Email</ion-label>
      <ion-input v-model="payload.email"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Crea Password</ion-label>
      <ion-input :type="switchPassword"  v-model="payload.password"></ion-input>
      <ion-icon slot="end" :icon="switchOcchio" size="large" @click="cambiaVisibile"></ion-icon>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Conferma Password</ion-label>
      <ion-input :type="switchPassword"  v-model="payload.confermaPassword"></ion-input>
      <ion-icon slot="end" :icon="switchOcchio" size="large" @click="cambiaVisibile"></ion-icon>
    </ion-item>

    <ion-button expand="full" @click="inviaModifica">Invio</ion-button>
  </form>
</template>

<script>
import axios from 'axios'
import {IonLabel, IonItem, IonInput, IonButton, IonIcon} from "@ionic/vue";
import { eyeOff, eye } from 'ionicons/icons';
export default {
  name: "LoginComponent",
  components:{IonLabel, IonInput, IonItem, IonButton, IonIcon},
  setup() {
    return { eyeOff, eye };
  },
  data(){
    return {
      visibile: false,
      payload:{
        email:'',
        password:'',
        confermaPassword:''
      }
    }
  },

  methods:{
    cambiaVisibile(){
      this.visibile = !this.visibile;
    },

    async inviaModifica(){
      await axios
          .post('https://www.coltricat.eu/api/aggiornaPassword', this.payload)
          .then((response) => {
            if (response.data == 0){
              alert('cliente non trovato')
            } else if(response.data == -1){
              alert('password e conferma password non coincidono')
            } else {
              localStorage.setItem('loggedIn', '1');
              localStorage.setItem('userId', response.data);
              window.location.href = '/'
            }
          })
    }
  },

  computed:{
    switchPassword(){
      return this.visibile ? 'text' : 'password'
    },

    switchOcchio(){
      return this.visibile ? eye : eyeOff
    }
  }
}
</script>

<style scoped>

</style>