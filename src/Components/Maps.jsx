    import React from 'react'
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj';

const keralaCoordinates = fromLonLat([76.2711, 10.8505]);
   

const map = new Map({
    view: new View({
        center: keralaCoordinates,
        zoom: 5, // Adjust the zoom level as needed
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: null, // This will be set dynamically in the component
    });

