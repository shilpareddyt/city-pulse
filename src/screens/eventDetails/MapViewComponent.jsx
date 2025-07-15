// MapViewComponent.jsx
import React, { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import axios from "axios";
import { useLocation } from "react-router-dom";


const MapViewComponent = (props) => {
  const {points}=props;
  const mapRef = useRef();
 // const [points,setPoints]=useState([]);
//   const location=useLocation();
// useEffect(()=>{
//   fetchEvents();
// },[])
// const fetchEvents = async () => {
//     try {
//       const res = await axios.get(
//         `https://app.ticketmaster.com/discovery/v2/events.json`,
//         {
//           params: {
//             city: location?.state?.city,
//             keyword: location?.state?.keyword,
//             apikey: import.meta.env.VITE_TICKETMASTER_API_KEY,
//             page: 0,
//             size: 100,
//           },
//         }
//       );

//       const newEvents = res.data._embedded?.events || [];
//       const points= [];
//       newEvents.forEach((event)=>{
//          event?._embedded?.venues?.forEach((venue)=>{
//           points.push({lat:venue?.location?.latitude,lon:venue?.location?.longitude,label:venue?.name })
//          })
//       })
//       setPoints(points)
     
//     } catch (error) {
//       console.error("Error fetching events", error);
//     }
//   };
  useEffect(() => {
    const webmap = new WebMap({
      basemap: "streets-navigation-vector",
    });

    const view = new MapView({
      container: mapRef.current,
      map: webmap,
      center: [0, 20], // Longitude, Latitude
      zoom: 2,
    });

    const graphicsLayer = new GraphicsLayer();
    webmap.add(graphicsLayer);

    points.forEach((point) => {
      console.log(points)
      const pointGraphic = new Graphic({
        geometry: {
          type: "point",
          longitude: point.lon,
          latitude: point.lat,
        },
        symbol: {
          type: "simple-marker",
          color: "red",
          size: "25px",
        },
        attributes: {
          name: point.label
        },
        popupTemplate: {
          title: "{name}"
        },
      });

      graphicsLayer.add(pointGraphic);
    });

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [points]);

  return <div style={{ height: "100vh", width: "100%" }} ref={mapRef}></div>;
};

export default MapViewComponent;
