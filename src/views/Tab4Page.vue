<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Esercizi</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Esercizi</ion-title>
        </ion-toolbar>
      </ion-header>

      <EserciziContainer />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import EserciziContainer from '@/components/EserciziContainer.vue';

</script>
