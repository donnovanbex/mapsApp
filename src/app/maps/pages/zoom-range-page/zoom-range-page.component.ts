import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl';




@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
  selector:'zoom-page'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy  {

  @ViewChild('map') public divmap? : ElementRef;

  public zoom : number = 10 ;
  public map? : Map;
  public curretlnglat : LngLat = new LngLat(-99.46357269709101, 18.620649372997377);



  ngAfterViewInit(): void {
    if(!this.divmap)return;
      this.map = new Map({
      container: this.divmap?.nativeElement , // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.curretlnglat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove;
  }

  mapListeners(){
    if(!this.map)return;
    this.map.on('zoom', (ev) => {this.zoom = this.map!.getZoom()});

    this.map.on('zoomend', (ev) => {
      if(this.map!.getZoom() < 18)return;
      this.map?.zoomTo(18)});

    this.map?.on('moveend',() => {
        this.curretlnglat = this.map!.getCenter();
       })

    }




  zoomIn(){
    this.map?.zoomIn();
  }
  zoomOut(){
   this.map?.zoomOut();
  }
  zoomChange(value : string ){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }





}
