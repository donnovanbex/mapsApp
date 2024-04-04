import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map,Marker} from 'mapbox-gl';

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent   implements AfterViewInit {
  @ViewChild('map') public divMap?:ElementRef;
  @Input() LngLat?:[number,number];


  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement ) throw "Map div nof found";
    if(!this.LngLat) throw "lnglat cant be null";

    const map = new Map({
      container: this.divMap?.nativeElement , // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.LngLat, // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive:false,
    });
    new Marker().setLngLat(this.LngLat).addTo(map);

  }









}
