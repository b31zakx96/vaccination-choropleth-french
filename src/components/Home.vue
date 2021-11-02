<template>
  <v-app>


    <v-app-bar
      app
      :color="color"
      :flat="flat"
      dark
      class="px-15"
      :class="{ expand: flat }"
    >
      <v-toolbar-title>
        <v-img src="@/assets/img/logo.png" max-width="50px" />
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
      <div v-else>
        <v-btn text @click="$vuetify.goTo('#home')">
          <span class="mr-2">Accueil</span>
        </v-btn>
        <v-btn text @click="$vuetify.goTo('#methodo')">
          <span class="mr-2">Méthodologie</span>
        </v-btn>
        <v-btn rounded outlined text @click="$vuetify.goTo('#mymap')">
          <span class="mr-2">Carte</span>
        </v-btn>
      </div>
    </v-app-bar>


    <v-main class="pt-0">


      <section id="home">
          <v-parallax dark src="@/assets/img/main.jpg" height="850">
            <v-row align="center" justify="center">
              <v-col cols="10">
                <v-row align="center" justify="center">
                  <v-col cols="12" md="6" xl="8">
                    <h4 class="font-weight-light">COVID-19 l Vaccination & Centres Infos</h4><hr class="font-weight-light"><br>
                    <h1 class="display-2 font-weight-bold mb-4">Pourcentage de Vaccintaion & Géolocalisation des centres en France</h1>
                    <h2 class="font-weight-light">
                      Carte interactive de l’état de vaccination contre Covid-19 et de la géolocalisation des centres de vaccination. Une autre façon de découvrir toute l'actualité sur le pourcentage de vaccination et les centres de vaccination disponibles en France.
                    </h2>
                    <v-btn
                      rounded
                      outlined
                      large
                      dark
                      @click="$vuetify.goTo('#mymap')"
                      class="mt-5"
                    >
                      Voire
                      <v-icon class="ml-2">mdi-arrow-down</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
                </v-row>
              </v-col>
            </v-row>
            <div class="svg-border-waves text-white">
              <v-img src="@/assets/img/borderWaves.svg" />
            </div>
          </v-parallax>
        </section>



        <section id="methodo">
          <br><br><br><br><br><br>
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-row align="center" justify="space-around">
                <v-col cols="12" class="text-center">
                  <h1 class="font-weight-light display-2">Méthodologie</h1> <v-divider></v-divider>
                  <h3 class="font-weight-light">
                    Découvrez les principales fonctionnalités de l'application 
                  </h3>
                </v-col> 
                <v-col
                  cols="12"
                  sm="6"
                  class="text-center"
                  v-for="(feature, i) in features"
                  :key="i"
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                      class="card"
                      shaped
                      :elevation="hover ? 10 : 4"
                      :class="{ up: hover }"
                    >
                      <v-img
                        :src="feature.img"
                        max-width="200px"
                        class="d-block ml-auto mr-auto"
                        :class="{ 'zoom-efect': hover }"
                      ></v-img>
                      <h1 class="font-weight-regular">{{ feature.title }}</h1>
                      <h4 class="font-weight-regular subtitle-1">
                        {{ feature.text }}
                      </h4>
                    </v-card>
                  </v-hover>
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn rounded dark outlined large color="secondary" class="mt-4" @click="goMethod">
                    En Savoir Plus.. <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-col> 
              </v-row>
            </v-col>
          </v-row>
          <br>
        </section>



      <section id="mymap">
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-row align="center" justify="center">
                <v-col sm="4" class="hidden-xs-only">
                  <v-img src="@/assets/img/vaxmap.svg" class="d-block ml-auto mr-auto" max-width="350px" />
                </v-col>
                <v-col cols="12" sm="8" class="white--text text-left">
                  <h1 class="font-weight-light display-2 mb-2">Carte Interactive</h1> <v-divider></v-divider>
                  <h3 class="font-weight-light">
                    Utilisez la carte interactive pour connaître le pourcentage de vaccination par région et département, recherchez les centres de vaccination.
                  </h3><v-divider></v-divider>
                  <h5 class="font-weight-light"><i>Appuyez sur le bouton pour démarrer.</i> </h5>
                  <v-btn rounded outlined large color="white" class="mt-4" @click="goMap">
                    <v-icon class="mr-2">
                      mdi-map
                    </v-icon>
                    Carte
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
          <div class="svg-border-waves text-white">
            <v-img src="~@/assets/img/borderWavesBlue.svg"/>
          </div>
      </section>


    </v-main>


    <v-scale-transition>
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        fixed
        bottom
        right
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition>


    <v-footer dark padless>
      <v-card flat tile class="secondary white--text text-center">
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Web Service Project</strong> — <strong>M2 OTG </strong> — <strong>Zakaria BELAHOUARI</strong>
        </v-card-text>
      </v-card>
    </v-footer>



  </v-app>
</template>



<script>

export default {
  name: "Home",

  components: {
    
  },

  data: () => ({
    features: [
        {
          img: require("@/assets/img/icon2.png"),
          title: "Géolocalisation des centres",
          text: "Trouvez l'emplacement des centres de vaccination Covid-19 à l'aide du code postal.",
        },
        {
          img: require("@/assets/img/icon1.png"),
          title: "Pourcentage de vaccination",
          text: "L'état de vaccination Covid-19 par région ou département dans une carte interactive. ",
        }
      ],
    fab: null,
    color: "",
    flat: null,
    drawer: null,
    isXs: false,
  }),

  created() {
    const top = window.pageYOffset || 0;
    if (top <= 60) {
      this.color = "transparent";
      this.flat = true;
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  watch: {
    fab(value) {
      if (value) {
        this.color = "secondary";
        this.flat = false;
      } else {
        this.color = "transparent";
        this.flat = true;
      }
    },
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    goMethod(){
      this.$router.push('/Methodology')
    },
    goMap(){
      this.$router.push('/Map')
    }
  },
};
</script>



<style scoped>
.v-main {
  background-image: url("~@/assets/img/bgMain.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  
}
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}

.v-card {
  width: 100%;
}
</style>



<style>

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}
.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-5px);
  transition: 0.5s ease-out;
}

section {
  position: relative;
  height: 795px;
}
#mymap {
  background-image: url("~@/assets/img/bgmap.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 840px;
}
#mymap .container,
#mymap .row {
  height: 100%;
}
#home {
  z-index: 0;
  height: 820px;
}
#methodo {
  z-index: 0;
  height: 820px;
}
</style>



