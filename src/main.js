
let pictApiKey, pictSecretKey;
const host = window.location.hostname;
if (host === 'atlas-dev.phila.gov.s3-website-us-east-1.amazonaws.com') {
  pictApiKey = process.env.VUE_APP_ATLASDEV_PICTOMETRY_API_KEY;
  pictSecretKey = process.env.VUE_APP_ATLASDEV_PICTOMETRY_SECRET_KEY;
} else {
  pictApiKey = process.env.VUE_APP_PICTOMETRY_API_KEY;
  pictSecretKey = process.env.VUE_APP_PICTOMETRY_SECRET_KEY;
}

import viewerboard from '@phila/viewerboard/src/main.js';

// import MarathonToggleControl from './components/MarathonToggleControl.vue';
// // import newSiteModal from './components/newSiteModal.vue';
// const customComps = {
//   'marathonToggleControl': MarathonToggleControl,
//   // 'newSiteModal': newSiteModal
// };


viewerboard({
  // customComps,
  initialTiledOverlays: ['fullMarathon'],
  app: {
    title: 'mapbox viewerboard test',
    tagLine: '',
  },
  // baseConfig: BASE_CONFIG_URL,
  cyclomedia: {
    enabled: true,
    // orientation: 'vertical',
    measurementAllowed: false,
    popoutAble: true,
    recordingsUrl: 'https://atlas.cyclomedia.com/Recordings/wfs',
    username: process.env.VUE_APP_CYCLOMEDIA_USERNAME,
    password: process.env.VUE_APP_CYCLOMEDIA_PASSWORD,
    apiKey: process.env.VUE_APP_CYCLOMEDIA_API_KEY,
  },
  pictometry: {
    enabled: false,
    // orientation: 'horizontal',
    iframeId: 'pictometry-ipa',
    apiKey: pictApiKey,
    secretKey: pictSecretKey,
  },
  initialView: ['map'],
  geocoder: {
    url: function (input) {
      var inputEncoded = encodeURIComponent(input);
      return 'https://api.phila.gov/ais/v1/search/' + inputEncoded;
    },
    params: {
      gatekeeperKey: process.env.VUE_APP_GATEKEEPER_KEY,
      include_units: true,
      opa_only: true,
    },
  },
  geolocation: {
    enabled: true,
    icon: [ 'far', 'dot-circle' ],
  },
  router: {
    enabled: true,
    type: 'vue'
  },
  // addressInput: {
  //   width: 350,
  //   mapWidth: 300,
  //   // position: 'right',
  //   autocompleteEnabled: false,
  //   autocompleteMax: 15,
  //   placeholder: 'Search for an address',
  // },
  map: {
    type: 'mapbox',
    center: [-75.188560, 39.982649],
    minZoom: 11,
    maxZoom: 25,
    shouldInitialize: true,
    zoom: 13,
    marathonToggle: true,
    basemapToggle: true,
  },
});
