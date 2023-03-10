<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Corallo Fitness Club</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <NewsContainer />
      <RichiestaContainer />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import RichiestaContainer from "@/components/RichiestaContainer";
import NewsContainer from "@/components/NewsContainer";
</script>
