import React, { useRef, useEffect } from "react";
//import ol from "ol";
/*import {Map as map} from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';*/

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;
  console.log("zoom: ", zoom);
  console.log("center: ", center);

  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat(
          [center.lng, center.lat]
        ),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;

