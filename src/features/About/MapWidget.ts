import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const createMapWidget = (containerDomNode: HTMLElement): L.Map => {
  const map = L.map(containerDomNode);
  map.setView([49.575, 32.091], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://wwwopenstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  return map;
};

export const addPopupToMapWidget = (map: L.Map) => {
  const popupDiv = document.createElement('div');
  L.popup().setLatLng([50.4488, 30.5222]).setContent(popupDiv).openOn(map);
  return popupDiv;
};
