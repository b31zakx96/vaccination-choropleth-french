<template>
<!-- difinir une zone sur l'écran pour placer la carte -->
        <div class="map">  

            <!-- initialisation de la carte et définition des coordonnées et du zoom de lancement -->
            <l-map ref="mymap" :center="[46.71109, 1.7191036]" :zoom="6" :minZoom="6" :options="mapOptions" >

                <!-- ajouter l'echelle sur la carte -->
                <l-control-scale position="bottomleft" :imperial="true" :metric="true"></l-control-scale>

                <!-- Ajouter le fond de carte (les tuiles openstreetmap) -->
                <l-tile-layer
                    v-for="tileProvider in tileProviders"
                    :key="tileProvider.name"
                    :name="tileProvider.name"
                    :visible="tileProvider.visible"
                    :url="tileProvider.url"
                    :attribution="tileProvider.attribution"
                layer-type="base"/>

                <!-- Ajouter la composante choroplethe pour la configuration: Appel des fichiers js & json (data: le fichier contient les données relative au covid, geojson: contient la geometrie) , définition de leur fonctionnalité, de leur style -->
                <l-choropleth-layer v-if="checkedChorop == true" :data="getData()" titleKey="name" idKey="id" :value="value" :extraValues="extraValues" geojsonIdKey="code" :geojson="getGeojson()" :colorScale="colorScale" :currentStrokeColor="currentStrokeColor">
                    <template slot-scope="props">

                    <!-- Création de l'infobulle "Pourcentage de la population vaccinée" et paramétrage des informations-->
                    <l-info-control :item="props.currentItem" :unit="props.unit" title="Pourcentage de la population vaccinée" :placeholder="placeholderchoro" position="bottomright"/>
                    
                    <!-- Création de l'onglet "Vaccination Statistics" basé sur la composant control -->
                    <l-reference-chart title="Vaccination Statistics" :colorScale="colorScale" :min="props.min" :max="props.max" position="topleft"/>
                    </template>
                </l-choropleth-layer>

                <!-- ajouter les marqueurs sur la carte --> 
                <l-marker   
                    :key="index" 
                    v-for="(vaxMarker, index) in vaxMarkers" 
                    :lat-lng="vaxMarker"
                    @click="setInfoMarker(vaxMarker)">

                    <!-- Ajouter popup pour la couche des marqueurs lorsque on click -->
                    <l-popup >  
                        <p class="text-center"> <strong>{{infoMarker.c_nom}}</strong> </p>
                    </l-popup>

                </l-marker>

            </l-map>
                
            <!-- creation d'un panneau latérale (sidebar) à travers lequel nous contrôlons la carte et  il contiendra des informations sur le centres -->
            <b-sidebar width="380px" v-model="active" id="sidebar-no-header"  title="COVID-19 l Vaccination Infos" shadow>
                <div class="p-3">
                    <p><b>Sélectionnez une option pour l'affichage de choroplèthe :</b></p> 
                    <v-col
                        class="d-flex center"
                        cols="12"
                        sm="12"
                    >
                    <!--Créer un sélecteur pour choisir l'affichage de choroplethe soit par région soit par département  -->
                    <b-form-select v-model="selected" :options="options"></b-form-select>
                    </v-col><br>

                    <!-- creation d'un checkbox pour masquer ou afficher la choroplethe -->
                    <b-form-checkbox v-model="checkedChorop" name="check-button" switch>
                        Afficher la choroplèthe
                    </b-form-checkbox>

                    <!-- creation d'un checkbox pour masquer ou afficher la section associée à la recherche de centres de vaccination  -->
                    <b-form-checkbox v-model="checked" name="check-button" switch>
                        Trouver les centres de vaccination
                    </b-form-checkbox>
     
                </div>

                <div class="p-3" v-if="checked == true">
                    <p><b>Entrer le code postal de la ville que vous souhaitez:</b></p> 

                    <v-col
                        class="d-flex center"
                        cols="12"
                        sm="10"
                    >
                    <!-- Créer une entrée (barre de recherche) pour faire des recherche par code postal-->
                    <vue-bootstrap-typeahead 
                    ref="inputAutocomplete"
                    v-model="zipCode"
                    @input="getSuggestedZipCode" 
                    :data="SuggestedZipCode"
                    placeholder="67000..."
                    />

                    <!-- Créer un bouton pour valider la recherche -->
                    <b-button rounded id="search_botton" @click="checkInput" class="mb-2" variant="outline-primary">
                        <b-icon icon="search" ></b-icon>
                    </b-button>
                    
                    <!-- Créer un bouton pour supprimer les marqueurs sur la carte et vider la barre de recherche  -->
                    <b-button rounded id="delete_botton" @click="deleteMarkers" class="mb-2" variant="outline-danger">
                        <b-icon icon="trash" ></b-icon>
                    </b-button>

                    </v-col><br>
                    <!-- Ajouter une liste d'informations liées au centre de vaccination qui s'affichera après un clic sur le marqueur -->
                    <b-list-group v-if="showMarkerInfo == true">
                        <b-list-group-item class="text-center" variant="primary" button> 
                            <strong > {{infoMarker.c_nom}} </strong>
                        </b-list-group-item>
                        <b-list-group-item button> 
                            <b>Adresse: </b>{{infoMarker.c_adr_num}} {{infoMarker.c_adr_voie}}, {{infoMarker.c_com_cp}} {{infoMarker.c_com_nom}}<br>
                            <b>Rendez-vous: </b> {{bool}} <br>
                            <b>Tel: </b>{{infoMarker.c_rdv_tel}} <br>
                            <b>Site: </b> <a :href="infoMarker.c_rdv_site_web" target="_blank" >Visite le site!</a><br>
                            <b-list-group-item button> 
                                <b>Lundi: </b>{{infoMarker.c_rdv_lundi}}<br>
                                <b>Mardi: </b>{{infoMarker.c_rdv_mardi}} <br>
                                <b>Mercredi: </b>{{infoMarker.c_rdv_mercredi}} <br>
                                <b>Jeudi: </b>{{infoMarker.c_rdv_jeudi}}<br>
                                <b>Vendredi: </b>{{infoMarker.c_rdv_vendredi}} <br>
                                <b>Samedi: </b>{{infoMarker.c_rdv_samedi}} <br>
                                <b>Dimanche: </b>{{infoMarker.c_rdv_dimanche}} <br>
                            </b-list-group-item>
                        </b-list-group-item>
                    </b-list-group>
                </div>

                <template v-slot:footer>
                    <div class="d-flex bg-light text-dark align-items-center px-3 py-2">
                        <b-button variant="primary" block @click="closeSidebar">Fermer</b-button>
                    </div>  
                </template>
            </b-sidebar>
            <!-- ajouter trois buttons: revenir à la page d'accueil, réinitialisation de vue et afficher le panneau (sidebar) -->
            <v-btn
                class="mx-2"
                fab
                small
                fixed
                top
                right
                @click="goHome"
            >
                <v-icon>mdi-home</v-icon>
            </v-btn>

            <v-btn
                id="btn-param"
                class="mx-2"
                fab
                small
                fixed
                top
                right
                @click="showSidebar()"
            >
                <v-icon>mdi-wrench</v-icon>
            </v-btn>

            <v-btn
                id="btn-view"
                class="mx-2"
                fab
                small
                fixed
                top
                right
                @click="resetView"
            >
                <v-icon>mdi-eye</v-icon>
            </v-btn>
            
        </div>
   
</template>

<script>
//importation des composantes de la choroplèthe
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'

//Chargement des fichiers js et json nécessaires à la réalisation de la carte choroplèthe et à l'apparition des marqueurs--> 
import frRegionGeojson from '../data/france-regions.json'
import frDepartmentGeojson from '../data/france-departments.json'
import { frRegionData } from '../data/france-regions-data'
import { frDepartmentData } from '../data/france-departments-data'
import frCentresVax from '../data/centres-vaccination.json'

//Importation tous les composants de leaflet dont nous avons besoin 
import L from 'leaflet';
import { LMap, LPopup, LMarker, LTileLayer, LControlLayers, LControlScale } from 'vue2-leaflet';

export default {
    name: "Map",
    data: function() {
        return {
            // Initialiser/Définir/Déclarer les variables appelées dans la section template en haut 
            frRegionData,
            frDepartmentData,
            frRegionGeojson,
            frDepartmentGeojson,
            frCentresVax,

            colorScale: ["F4D03F", "85C1E9", "4A235A"],
            extraValues: [{
                key: "percent_vax_complet",
                metric: "% de la population ayant reçu au moins une dose"
            }],
            value: {
                key: "percent_vax_dose1",
                metric: "% de la population est pleinement vaccinée"
            },
            mapOptions: {
                attributionControl: false,
                zoomControl:false,
            },
            currentStrokeColor: 'D35400',
            placeholderchoro: 'Passez la souris sur un département',
            selected: 'department',
            checked: false,
            checkedChorop: true,
            zipCode : null,
            options: [
            { value: 'region', text: 'Par Région' },
            { value: 'department', text: 'Par Département' },
            ],
            active: false,
            tileProviders: [
                {
                name: 'OpenStreetMap',
                visible: true,
                url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
                attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }
            ],
            bounds: null,
            infoMarker : {},
            bool: false,
            showMarkerInfo : false,
            SuggestedZipCode: [],
            vaxMarkers: []
        }

    }, //data

    components: {

        LMap,
        LMarker,
        LPopup, 
        LTileLayer,
        LControlScale,
        LControlLayers,
        'l-info-control': InfoControl, 
        'l-reference-chart': ReferenceChart, 
        'l-choropleth-layer': ChoroplethLayer 

    }, //components

    mounted() {

        this.$nextTick(() => {

            // Appel de la fonction qui réinitialise la vue de la carte lorsque la page de la carte vient d'être chargée 
            this.resetView();

        });

    }, //mounted

    methods: {
        // partie choroplethe
        //la fonction qui permet la récupération de données Covid soit pour une région soit un département selon le choix choisi par l'utilisateur 
        getData(){
            if (this.selected == 'region' ){ this.placeholderchoro = 'Passez la souris sur une région' ; return this.frRegionData }
            if (this.selected == 'department' ){ this.placeholderchoro = 'Passez la souris sur un département'; return this.frDepartmentData }
        },

        //Récupérer la couche geojson (région ou département) correspondant au choix fait par l'utilisateur
        getGeojson(){
            if (this.selected == 'region' ){ return this.frRegionGeojson }
            if (this.selected == 'department' ){ return this.frDepartmentGeojson }
        },


        // partie marqueures
        //supprimer les marqueurs précédemment affichés sur la carte une fois que l'utilisateur a effectué une nouvelle recherche 
        deleteMarkers(){
            this.vaxMarkers = [];
            this.zipCode = '';
            this.$refs.inputAutocomplete.inputValue = '';
            this.showMarkerInfo = false
        },

        //Récupérer les données correspondant au marqueur sur lequel on a cliqué pour l'afficher dans la liste d'informations
        setInfoMarker(marker){
            this.infoMarker = this.frCentresVax.features[marker.id].properties;
            this.showMarkerInfo = true;
            this.showSidebar()
            if(this.infoMarker.c_rdv == true){this.bool = 'Oui'}else{this.bool = 'Non'}
        },

        //récupérer le code postal d'après le fichier de données pour faire des propositions en fonction de la valeur saisie. 
        getSuggestedZipCode(){
            var data = this.frCentresVax.features
            for (let i = 0; i < data.length; i++){
                this.SuggestedZipCode.push(data[i].properties.c_com_cp);
            }
            this.SuggestedZipCode = [ ...new Set(this.SuggestedZipCode) ]; 
        },

        //vérifier la valeur saisie avec les valeurs correspondantes dans le fichier de données puis nous stockons leurs coordonnées dans le tableau des marqueurs qui s'affichera.
        checkInput(){
            this.vaxMarkers = []
            this.showMarkerInfo = false;
            var data = this.frCentresVax.features
            for (let i = 0; i < data.length; i++){
                if(data[i].properties.c_com_cp == this.zipCode){
                        const newMarker = {
                            lat: data[i].properties.c_lat_coor1,
                            lng: data[i].properties.c_long_coor1,
                            id: i,
                            }
                    this.vaxMarkers.push(newMarker)
                }
            }
            var markerBounds = [];
            for (var i=0; i < this.vaxMarkers.length; i++){
                markerBounds.push(L.marker([this.vaxMarkers[i].lat, this.vaxMarkers[i].lng]));
            }
            var group = L.featureGroup(markerBounds);
            this.$refs.mymap.mapObject.fitBounds(group.getBounds(), { padding: [20, 20] });
        },

        
        // les autres
        //réinitialisation de vue de la carte 
        resetView(){
            this.$refs.mymap.mapObject.setView([46.71109, 1.7191036], 6.35);
        },

        // La fonction qui affiche le panneau par un clic du bouton avec l'icône de clé 
        showSidebar() {
            this.active = true
        },

        // La fonction qui ferme le panneau par un clic sur le bouton de Fermer 
        closeSidebar(){
            this.active = false
        },

        // la fonction qui permet de revenir à la page d'accueil
        goHome(){
            this.$router.push({ path: '/' });
        }
    }

} //export default 

</script>


<!--  style  -->   <!-- Définition le style de la carte, y compris leaflet et les boutons, on a utilisé bootstrap et vuetify pour facilite le travail du style -->

<style scoped>

@import "../../node_modules/leaflet/dist/leaflet.css";

.map{
  height: 100%;
  width: 100%;
  position:absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.v-btn {
    z-index: 1000;
    right: 0px; 
}

#btn-view{
    margin-top: 48px;
}

#btn-param{
    margin-top: 96px;
}

</style>
