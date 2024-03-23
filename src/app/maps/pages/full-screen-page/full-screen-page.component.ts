import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Map} from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
  selector:'fullScrenn-page'
})
export class FullScreenPageComponent implements AfterViewInit {
  @ViewChild('map') public divmap? : ElementRef;

  ngAfterViewInit(): void {
    if(!this.divmap)return;
    const map = new Map({
      container: this.divmap?.nativeElement , // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-0, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
