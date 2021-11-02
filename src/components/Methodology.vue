<template>
<div>
    <v-container>    

        <v-btn id="btn-home"
            fab
            fixed
            top
            right
            dark
            @click="goHome"
        >
            <v-icon>mdi-home</v-icon>
        </v-btn>

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
<br>
<p style="text-align:center;"><strong>&nbsp;</strong></p>
<h2 style="text-align:center;"><span style="color:black;font-family:Georgia, serif;"><strong>Méthodologie</strong></span></h2>
<p style="text-align:center;">&nbsp;</p>
<hr> <br>
<p>&nbsp;</p>
<p style="text-align:justify;"><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Dans cette partie on va décrire l’aspect pratique de notre travail, on va développer une carte interactive en s'appuyant sur les données Geojson des régions et des départements de la France pour fournir une carte choroplèthe en visualisant le pourcentage de population vaccinées ainsi on va utiliser les données (JSON) des centres de vaccination pour trouver et afficher les emplacements des centres dans la carte. En effet, on va essayer de concevoir une interface intuitive et pratique.</span></p>
<p style="text-align:justify;"><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">On va décrire aussi dans ce qui suit l’ensemble des moyens technologiques utilisés pour le développement.</span></p>
<p style="text-align:justify;"><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Afin de créer la carte choroplèthe et visualiser les centres de vaccination, on va utiliser le framworks Vuejs de JavaScript et la bibliotheque Leaflet (vue2-leaflet et vue-choropleth)</span></p>
<h4><span style="color:hsl(0, 0%, 0%);font-family:Georgia, serif;"><strong>Vue.js</strong></span></h4>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Vue.js, il s’agit d’un framework Javascript open-source très populaire, qui tient la dragée à Angular et React. Je vous invite à aller vous renseigner dessus à cette adresse:&nbsp;</span><a href="https://vuejs.org/" target="_blank"><span style="color:hsl(240, 75%, 60%);">https://vuejs.org/</span></a></p>
<h4><span style="color:hsl(0, 0%, 0%);font-family:Georgia, serif;"><strong>Leaflet</strong></span></h4>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Leaflet est une librairie Javascript permettant de créer des cartes interactives et customisables. Librairie très populaire, facile à utiliser, elle sera au centre de ce tutoriel. Il existe une version spécifique pour Vue.js:</span><span style="color:hsl(0, 0%, 0%);">&nbsp;</span><a href="https://vue2-leaflet.netlify.app/" target="_blank"><span style="color:hsl(240, 75%, 60%);">https://vue2-leaflet.netlify.app/</span></a></p>
<h4><span style="color:hsl(0, 0%, 0%);font-family:Georgia, serif;"><strong>Générer le projet</strong></span></h4>
<pre><code class="language-plaintext">npm install -g @cli/vue
vue create vaccination_carte </code></pre>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Pour lancer le projet, on utilisera la commande:</span></p>
<pre><code class="language-plaintext">npm run serve</code></pre>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Voici la hiérarchie de dossiers après la création du projet :</span></p>
<pre><code class="language-plaintext">d-----&nbsp;   28/10/2021 21:41&nbsp;    &nbsp; node_modules
d-----&nbsp;   14/10/2021 20:56       public
d-----&nbsp;   28/10/2021 16:22&nbsp;      src
-a----&nbsp;   10/03/2021 21:54       .gitignore
-a----&nbsp;   10/03/2021 21:54       babel.config.js
-a----&nbsp;   10/03/2021 21:54       LICENSE
-a----&nbsp;   28/10/2021 21:41&nbsp;    &nbsp; package-lock.json
-a----&nbsp;   28/10/2021 21:41&nbsp;      package.json
-a----&nbsp;   10/03/2021 21:54       README.md
-a----&nbsp;   28/10/2021 21:09&nbsp;      vue.config.js</code></pre>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">- src/ : ce dossier va contenir notre code VUEJS</span><br><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">- package.json : c’est ce fichier qui est utilisé par NPM pour définir les dépendances de notre application.</span></p>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">On utilise la commande npm pour installer Vue2Leaflet et Vue-choropleth</span></p>
<pre><code class="language-plaintext">npm install vue2-leaflet leaflet --save
npm install vue-choropleth –save</code></pre>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Une fois l'installation effectuée, nous devons l'importer dans notre fichier map.vue (obligatoire).</span></p>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Avant d'utiliser les fonctionnalités de Leaflet, on doit importer aussi le style dans le fichier main.js</span></p>
<pre><code class="language-javascript">import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
 &nbsp;iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
 &nbsp;iconUrl: require("leaflet/dist/images/marker-icon.png"),
 &nbsp;shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});</code></pre>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">En ce qui concerne CSS de l’application, on utilise simplement Vue Bootstrap et Vuetify.</span></p>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Nous commençons par la création&nbsp;des composants Map.vue, Home.vue et Methodology.Vue pour créer les chemins entre nos pages, nous allons donc utiliser "vue-router" et ajouter les commandes suivantes au fichier main.js.&nbsp;</span></p>
<pre><code class="language-javascript">const router = new VueRouter({
 &nbsp;routes: [
 &nbsp;&nbsp; { path: '/', component: Home},
 &nbsp;&nbsp;&nbsp;{ path: '/Map', component: Map },
 &nbsp;&nbsp;&nbsp;{ path: '/Methodology', component: Methodology },
  ]
 &nbsp;mode: 'history'
})</code></pre>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Ici, les routes dans notre application Vue sont définies via un tableau contenant des objets qui définissent chaque route :</span></p>
<ul>
    <li><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Page du contexte ou d'accueil</span></li>
    <li><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Page qui contient la carte</span></li>
    <li><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Page qui contient la méthodologie</span></li>
</ul>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">On va nous concentrer sur la page de la carte (Map.vue) où se trouvent l’ensemble des fonctionnalités de l'application, et nous la diviserons en deux parties&nbsp;:</span></p>
<h4><span style="color:black;font-family:Georgia, serif;"><strong>Partie 1 : La carte choroplèthe</strong></span></h4>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Avant de créer la carte choroplethe, on va ajouter le fond de la carte avec les balises </span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>l-map</code></span><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"> et </span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>l-tile-layer</code></span><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">.</span></p>
<pre><code class="language-html">&lt;l-map ref="mymap" :center="[46.71109, 1.7191036]" :zoom="6" :minZoom="6" :options="mapOptions"&gt;
    &lt;l-control-scale position="bottomleft" :imperial="true" :metric="true"&gt;&lt;/l-control-scale&gt;
    &lt;l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
       :visible="tileProvider.visible"
        :url="tileProvider.url"
       :attribution="tileProvider.attribution"
    layer-type="base"/&gt;
&lt;/l-map&gt;</code></pre>
<pre><code class="language-javascript">export default {
    name: "Map",
    data: function() {
        return {
            mapOptions: {
                attributionControl: false,
                zoomControl:false,
            },
            tileProviders: [
                {
                name: 'OpenStreetMap',
                visible: true,
                url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
                attribution: '&amp;copy; &lt;a target="_blank" href="http://osm.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors',
               }
            ],
        }
    }
}</code></pre>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Ensuite, pour construire une carte choroplèthe, Il y a 2 fichiers nécessaires:</span></p>
<ul>
    <li><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Un jeu de données avec les informations que vous souhaitez afficher</span></li>
    <li><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Un fichier GeoJSON avec la délimitation des zones à tracer</span></li>
</ul>
<h4><span style="color:black;font-family:Georgia, serif;"><strong>Étape 1 : Collecte des données de visualisation:</strong></span></h4>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Les données sont disponibles sur data.gouv.fr, qui sont des données relatives aux personnes vaccinées contre la Covid-19 dans un fichier csv par région et département, on va donc récupérer les valeurs correspondant&nbsp;au nombre de personnes qui ont eu au moins une seule dose et le nombre de personnes qui ont eu leur vaccin complètement&nbsp; pour calculer le pourcentage en fonction de la population totale de chaque région et département de France. Ensuite, nous allons les structurer et les mettre dans un fichier js.&nbsp;</span></p>
<p><span style="font-family:Georgia, serif;"><i>Exemple de données après structuration :&nbsp;</i></span></p>
<pre><code class="language-javascript">export var frRegionData = [
  {
    id: 1,
    name: "Guadeloupe",
    pop_tot: 375693,
   	pop_vax_dose1: 130095,
  	pop_vax_complet: 118504,
   	percent_vax_dose1: 34.6,
   	percent_vax_complet: 31.5
  },
  ... ]</code></pre>
<h4><span style="color:black;font-family:Georgia, serif;"><strong>Étape 2 : Obtenir le GeoJSON</strong></span></h4>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Avec l'essor de l'Open Data, de nombreuses données géographiques sont accessibles gratuitement sur le web. Pour notre cas, on a besoin d'une carte avec les contours des régions et départements de France, et pour ce faire, on va utiliser le site Web france-geojson.gregoiredavid.fr, </span><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">nous récupérons donc deux fichiers GeoJSON, le premier avec un découpage par départements&nbsp;et le second par régions.&nbsp;</span></p>
<p><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Maintenant on a des données de vaccination et les fichiers GeoJSON, il va falloir les relier. Afin de le mettre en place avec VueChoropleth, l'idée est basique. Il suffit de faire la correspondance (lien) entre les clés des features de GeoJSON qui sont représentées dans le fichier GeoJSON par le </span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>code</code></span><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"> et dans le fichier de données par le clé de </span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>id</code></span><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">. Dans notre cas, l'</span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>id</code></span><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"> et </span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>code</code></span><span style="color:black;font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"> devrons être le code géographique&nbsp;de la région ou du département.&nbsp;</span></p>
<pre><code class="language-html">&lt;l-choropleth-layer v-if="checkedChorop == true" :data="getData()" titleKey="name" idKey="id" :value="value" :extraValues="extraValues" geojsonIdKey="code" :geojson="getGeojson()" :colorScale="colorScale"&gt;
    &lt;template slot-scope="props"&gt;
      &lt;l-info-control :item="props.currentItem" :unit="props.unit" title="Pourcentage de la population vaccinée" placeholder="Passez la souris sur un département" position="bottomright"/&gt;
       &lt;l-reference-chart title="Vaccination Statistics" :colorScale="colorScale" :min="props.min" :max="props.max" position="topleft"/&gt;
    &lt;/template&gt;
&lt;/l-choropleth-layer&gt;</code></pre>
<pre><code class="language-javascript">export default {
    name: "Map",
    data: function() {
        return {
            colorScale: ["F4D03F", "85C1E9", "4A235A"],
            value: {
                key: "percent_vax_dose1",
                metric: "% de la population est pleinement vaccinée"
            },
           extraValues: [{
               key: "percent_vax_complet",
               metric: "% de la population ayant reçu au moins une dose"
            }],
           mapOptions: {
               attributionControl: false,
               zoomControl:false,
            },
           currentStrokeColor: 'D35400',
           placeholderchoro: 'Passez la souris sur un département',
         }
     }
}</code></pre>
<ul>
    <li><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><strong>geojson</strong> : L'objet GeoJSON à utiliser</span></li>
    <li><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><strong>data</strong>&nbsp;: objet de données avec les informations à afficher sur la carte</span></li>
    <li><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><strong>titleKey&nbsp;</strong>: Nom de l'objet de données à afficher lorsque vous survolez une certaine région ou département de notre carte (par exemple, name)</span></li>
    <li><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><strong>geojsonIdKey </strong>: Clé des propriété du GeoJSON qui sert d'identifiant de chaque région ou département de la carte (par exemple, code)</span></li>
    <li><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><strong>idKey&nbsp;</strong>: clé de l'objet de données qui correspond à la valeur geojsonIdKey.</span></li>
    <li><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><strong>valeur&nbsp;</strong>: objet JS avec deux propriétés, clé&nbsp;: qui correspond à la propriété de données qui contient l'ensemble de domaine de valeurs (par exemple,&nbsp;</span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>percent_vax_dose1</code></span><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"> ) et </span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>metric</code></span><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">&nbsp;: qui correspond à la propriété de données qui décrit l'unité sur laquelle vous travaillez (par exemple</span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">&nbsp;"<code>% de la population ayant reçu au moins une dose</code>")</span></li>
    <li><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><strong>colorScale&nbsp;</strong>: tableau de codes de couleur hexadécimaux pour remplir chaque région ou departement de la carte. (par exemple</span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">&nbsp;<code>["F4D03F", "85C1E9", "4A235A"]</code>)</span></li>
</ul>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">On voit que dans les props </span><span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">(<code>:geojson="getGeojson()"</code> et&nbsp;<code>:data="getData()"</code>) </span><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">nous avons fait les fonctions <code>getGeojson()</code> et <code>getData()</code> qui permettent de récupérer les données dynamiquement selon le choix de l'utilisateur s'il choisit d'afficher les sections ou régions dans le choroplèthe et cela se fait à l'aide d'un sélecteur dans l'interface.&nbsp;</span></p>
<pre><code class="language-javascript">getData(){
    if (this.selected == 'region' ){ this.placeholderchoro = 'Passez la souris sur une région' ; return this.frRegionData }
    if (this.selected == 'department' ){ this.placeholderchoro = 'Passez la souris sur un département'; return this.frDepartmentData }
},
getGeojson(){
    if (this.selected == 'region' ){ return this.frRegionGeojson }
    if (this.selected == 'department' ){ return this.frDepartmentGeojson }
},</code></pre>
<h4><span style="color:black;font-family:Georgia, serif;"><strong>Partie 2 : La visualisation des centers de vaccination</strong></span></h4>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Avant de commencer à visualiser les centres, il faut s'assurer que l'on dispose des données pour l'affichées, et comme précédemment on va utiliser le site data.gouv.fr pour récupérer des données réelles (Lieux de vaccination contre la Covid-19) au format JSON qui se compose de points de localisation (latitude et longitude) et d'informations supplémentaires concernant chaque centre (le nom du centre, adresse, horaires de travail…).&nbsp;</span></p>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">On souhaite ajouter quelques fonctionnalités à notre carte. nous allons construire une fonction pour effectuer la recherche à partir du code postal pour arrivée à trouver facilement les centres, en tapant simplement le code postal et l'algorithme affichera des résultats pertinents en fonction de la saisie de l'utilisateur. Nous allons donc représenter les marqueurs correspondant à la recherche dans la carte en interrogeant avec le fichier de données JSON.</span></p>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Les marqueurs sont affichés sur la carte avec le nom du centre à l'aide d'une fenêtre contextuelle&nbsp;<code>l-popup</code> après avoir cliqué sur le marqueur et d'autres informations sont également affichées dans la barre latérale tels que l'adresse, horaires d'ouvertures…&nbsp;</span></p>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">De plus, Après avoir effectué un zoom avant et arrière sur chaque emplacement, il est bon de réinitialiser notre vue par défaut. On va donc ajouter un bouton de réinitialisation de vue de la carte.&nbsp;</span></p>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Alors, afin d'affichés les marqueurs, on ajoute la balise&nbsp;<code>l-marker</code> dans la balise&nbsp;<code>l-map</code>.</span></p>
<pre><code class="language-html"> &lt;l-marker&nbsp;  
    :key="index" 
    v-for="(vaxMarker, index) in vaxMarkers" 
    :lat-lng="vaxMarker"
   &nbsp;@click="setInfoMarker(vaxMarker)"&gt;
    &lt;l-popup &gt; 
        &lt;p class="text-center"&gt; &lt;strong&gt;{{infoMarker.c_nom}&lt;/strong&gt; &lt;/p&gt;
    &lt;/l-popup&gt;
&lt;/l-marker&gt;</code></pre>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Voici les différentes fonctions:</span></p>
<pre><code class="language-javascript">deleteMarkers(){
    this.vaxMarkers = [];
    this.zipCode = '';
    this.$refs.inputAutocomplete.inputValue = '';
    this.showMarkerInfo = false
},
setInfoMarker(marker){
    this.infoMarker = this.frCentresVax.features[marker.id].properties;
    this.showMarkerInfo = true;
    this.showSidebar()
    if(this.infoMarker.c_rdv == true){this.bool = 'Oui'}else{this.bool = 'Non'}
    console.log(this.infoMarker)
},
getSuggestedZipCode(){
    var data = this.frCentresVax.features
    for (let i = 0; i &lt; data.length; i++){
        this.SuggestedZipCode.push(data[i].properties.c_com_cp);
    }
    this.SuggestedZipCode = [ ...new Set(this.SuggestedZipCode) ]; 
},
checkInput(){
    this.vaxMarkers = []
    this.showMarkerInfo = false;
    var data = this.frCentresVax.features
    for (let i = 0; i &lt; data.length; i++){
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
    for (var i=0; i &lt; this.vaxMarkers.length; i++){
       markerBounds.push(L.marker([this.vaxMarkers[i].lat, this.vaxMarkers[i].lng]));
    }
    var group = L.featureGroup(markerBounds);
   
   this.$refs.mymap.mapObject.fitBounds(group.getBounds(), { padding: [20, 20] });
},</code></pre>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>deleteMarkers()</code> : Supprimer les marqueurs précédemment affichés sur la carte une fois que l'utilisateur a effectué une nouvelle recherche&nbsp;</span></p>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>getSuggestedZipCode()</code> : Récupérer le code postal d'après le fichier de données pour faire des propositions en fonction de la valeur saisie.&nbsp;</span></p>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;"><code>checkInput()</code> : Vérifier la valeur saisie avec les valeurs correspondantes dans le fichier de données puis nous stockons leurs coordonnées dans le tableau des marqueurs qui s'affichera.</span></p>
<h4><span style="color:hsl(0, 0%, 0%);font-family:Georgia, serif;"><strong>Recap</strong></span></h4>
<p><span style="color:hsl(0, 0%, 0%);font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">Nous n'avons pas tout détaillé à ce sujet donc pour récapituler notre script, vous trouverez l'ensemble du code source de ce projet à l'adresse suivante: </span><a href="https://github.com/b31zakx96/vaccination-choropleth-french" target="_blank">b31zakx96/vaccination-choropleth-french (github.com)</a></p>
<p>&nbsp;</p>
<p><br><br>&nbsp;</p>
<p>&nbsp;</p>
            
    </v-container>

    <v-footer padless>
      <v-card flat tile class="secondary white--text text-center">
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Web Service Project</strong> — <strong>M2 OTG </strong> — <strong>Zakaria BELAHOUARI</strong>
        </v-card-text>
      </v-card>
    </v-footer>

</div>
</template>

<style scoped>
  #btn-home{
    background-color: #171b34 !important;
    border-color: #171b34 !important;
  }
  pre {
    background: #eee;
    font-family: "Courier 10 Pitch", Courier, monospace;
    line-height: 1.6;
    margin-bottom: 20px;
    max-width: 100%;
    overflow: auto;
    padding: 5px 15px;
  }
  ul {
    padding-left: 50px;
}
.v-card {
  width: 100%;
}

</style>

<script>

export default {
  name: "Methodology",
  data: () => ({
    fab: null,
  }),
  created:{
    toTop() {
      this.$vuetify.goTo(0);
    }
  },
  methods:{

    goHome(){
      this.$router.push('/')
    },

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }

  }

};
</script>
