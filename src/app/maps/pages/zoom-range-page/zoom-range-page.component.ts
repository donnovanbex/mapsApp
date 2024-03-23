import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Map} from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
  selector:'zoom-page'
})
export class ZoomRangePageComponent implements AfterViewInit{

  @ViewChild('map') public divmap? : ElementRef;

  public zoom : number = 10 ;
  public map? : Map;



  ngAfterViewInit(): void {
    if(!this.divmap)return;
      this.map = new Map({
      container: this.divmap?.nativeElement , // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-0, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners();
  }

  mapListeners(){
    if(!this.map)return;
    this.map.on('zoom', (ev) => {this.zoom = this.map!.getZoom();})
  }
  zoomIn(){
    this.map?.zoomIn();
  }
  zoomOut(){
    if(this.map!.getZoom() < 18)return;
    this.map!.zoomTo(18);
  }

}
