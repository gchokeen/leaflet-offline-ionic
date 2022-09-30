import { Component } from '@angular/core';

import { Map, latLng, tileLayer, Layer, marker, CRS } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet.offline';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  uuid: number = Math.floor(Math.random() * 1000);

  mapID: string = "map";

  map: Map;


  constructor() { }



  onMapReady() {
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  ionViewDidEnter() {
    this.mapID = 'map-' + this.uuid;

    setTimeout(() => {



      this.map = L.map(this.mapID).setView([51.505, -0.09], 13);

      var query = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      L.tileLayer(query, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      L.marker([51.5, -0.09]).addTo(this.map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();




      setTimeout(() => {
        this.map.invalidateSize();

        console.log("invalidateSize", this.map);
      }, 200);




      this.map.addEventListener('load', this.onMapReady)



      // @ts-ignore   
      const baseLayer = L.tileLayer.offline
        (query, {}, {}).addTo(this.map);


      // add buttons to save tiles in area viewed
      //@ts-ignore
      const control = L.control.savetiles(baseLayer, {
        zoomlevels: [13, 16], // optional zoomlevels to save, default current zoomlevel
        confirm(layer, successCallback) {
          // eslint-disable-next-line no-alert
          if (window.confirm(`Save ${layer._tilesforSave.length}`)) {
            successCallback();
          }
        },
        confirmRemoval(layer, successCallback) {
          // eslint-disable-next-line no-alert
          if (window.confirm('Remove all the tiles?')) {
            successCallback();
          }
        },
        saveText:
          'xx<i class="fa fa-download" aria-hidden="true" title="Save tiles"></i>',
        rmText: '<i class="fa fa-trash" aria-hidden="true"  title="Remove tiles"></i>',
      });
      control.addTo(this.map);


    }, 10);







  }


  ionViewWillLeave() {


    var container: any = L.DomUtil.get(this.mapID);



    if (container._leaflet_id) {
      this.map.off();
      this.map.remove();



    }


  }
}
