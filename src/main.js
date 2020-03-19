
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
    title: 'Mapbox Viewerboard Test',
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
    // center: [-75.188560, 39.982649],
    center: [-75.175125, 39.961231],
    minZoom: 11,
    maxZoom: 25,
    shouldInitialize: true,
    zoom: 14,
    marathonToggle: true,
    basemapToggle: true,
  },
  mbStyle: {
    version: 8,
    sources: {
      pwd: {
        tiles: [
          '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
        ],
        type: 'raster',
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'pwd',
        type: 'raster',
        source: 'pwd',
      },

    ]
  },
  basemapSources: {
    pwd: {
      source: {
        tiles: [
          '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'pwd',
        type: 'raster',
      },
    },
    imagery2019: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2019_3in/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imagery2019',
        type: 'raster',
      },
    },
  },
  basemapLabelSources:{
    cityBasemapLabels: {
      source: {
        tiles: ['//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'cityBasemapLabels',
        type: 'raster',
      },
    },
    imageryBasemapLabels: {
      source: {
        tiles: ['//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_Labels/MapServer/tile/{z}/{y}/{x}'],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imageryBasemapLabels',
        type: 'raster',
      },
    },
  },
  cameraSource: {
    'type': 'image',
    'url': 'https://mapboard-images.s3.amazonaws.com/camera.png',
    'coordinates': [[-75.163471, 39.953338]],
  },
    // parcels: {
    //   source: {
    //     tiles: ['//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/PWDParcel_ImageryOverlay/MapServer/tile/{z}/{y}/{x}'],
    //     type: 'raster',
    //     tileSize: 256,
    //   },
    //   layer: {
    //     id: 'parcels',
    //     type: 'raster',
    //   },
    // },
  overlaySources: {
    fullMarathon: {
      source: {
        tiles: ['//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/Full_Marathon_2019/MapServer/tile/{z}/{y}/{x}'],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        // id: 'overlay-fullMarathon',
        id: 'fullMarathon',
        type: 'raster',
      },
    },
    halfMarathon: {
      source: {
        tiles: ['//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/Half_Marathon_2019/MapServer/tile/{z}/{y}/{x}'],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        // id: 'overlay-halfMarathon',
        id: 'halfMarathon',
        type: 'raster',
      },
    },
  },
  vectorTilesSource: {
    type: "vector",
    tiles: [
      "https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/PVL_Original/VectorTileServer/tile/{z}/{y}/{x}.pbf"
    ],
    maxzoom: 12


    // type: "vector",
    // url: "https://services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/PVL_Original/FeatureServer/0?token=hR-TyZT_GLb3PJ1qYZj9VoSV9_L-cbz4ttmedfD9SWibI3Fkv2M4wLZDRiISRnUvc_wfvK_XaXcK0eDHbd-9KLveX3ybWRLeHRgJNtu_CCCOa89Jc5ZKroTOrw-paqIolAR5Gv04CoStZ8qTpCMulf5RrvdlPSq6Clbyv6Buq5Qx97tHP8Z02bbua0K56CBk75x6hNrrd3yo2XDGR5G4LEUxLiffPUqaifGEv4uiaJ763lPgmvNuVkbusyIRI5CL",
    // url: "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/PVL_Original/FeatureServer",
    // url: "https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/PVL_Original/VectorTileServer",
  },
  vectorTiles: {
    id: "PVL_Original",
    type: "line",
    source: {
      type: "vector",
      tiles: [
        "https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/PVL_Original/VectorTileServer/tile/{z}/{y}/{x}.pbf"
      ],
      maxzoom: 12
    },
    "source-layer":"Street_Centerline_PVL",
    layout: {
      "line-cap": "butt",
      "line-join": "miter"
    },
    // paint: {
    //   "line-color": "rgba(109, 128, 3, 0.5)",
    //   "line-width": 3
    // }
  },
});
