<template>
  <div v-if="!logged">
    <LoginComponent />
  </div>
  <div v-else>
    <NewsContainer />
    <RichiestaContainer />
  </div>


</template>

<script>
import LoginComponent from "@/components/home/LoginComponent";
import RichiestaContainer from "@/components/RichiestaContainer";
import NewsContainer from "@/components/NewsContainer";
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app';
export default {
  name: "HomeComponent",
  components: {LoginComponent, RichiestaContainer, NewsContainer},
  setup() {
    const ionRouter = useIonRouter();
    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  },
  mounted() {
    this.verificaLogin();
  },

  methods:{
    verificaLogin(){

    }
  },

  computed:{
    logged(){
      return localStorage.getItem('loggedIn');
    }
  }
}
</script>

<style scoped>

</style>