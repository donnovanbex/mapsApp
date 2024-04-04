import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Map,LngLat, Marker} from 'mapbox-gl';
interface MarkerColor{
  color:string;
  marker: Marker;
};
interface plainMarker{
  color:string;
  lngLat:number[];
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
  selector:'marker-page'
})
export class MarkersPageComponent{

  @ViewChild('map') public divmap? : ElementRef;

  public markers : MarkerColor[] = [];
  public zoom : number = 10 ;
  public map! : Map;
  public curretlnglat : LngLat = new LngLat(-99.46499604445363, 18.621147639554422);

  ngAfterViewInit(): void {
    if(!this.divmap)return;
    this.map = new Map({
      container: this.divmap.nativeElement , // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.curretlnglat, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });
    this.readToLocalStorage();
  //   const marker = new Marker({
  //     color:'red'
  //   }).setLngLat(this.curretlnglat).addTo(this.map);
   }

   addMarkert(LngLat:LngLat,color:string ):void{
    if(!this.map)return;
    const marker = new Marker({
      color:color,
      draggable:true,
    }).setLngLat(LngLat).addTo(this.map);
    this.markers.push({color,marker});
    this.saveToLocalStorage();

    marker.on('dragend', () => {
    this.saveToLocalStorage()


    })




   }

   createMaker(){
    if(!this.map)return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const LngLat = this.map.getCenter();
    this.addMarkert(LngLat,color);
   }
   deletedMarker(i:number){
    this.markers[i].marker.remove();
    this.markers.splice(i,1);
   }
   flyTo(marker:Marker){
    this.map?.flyTo({
      zoom:16,
      center: marker.getLngLat()
    })
   }
   saveToLocalStorage(){
    const plainmarker : plainMarker[] = this.markers.map( ({color, marker}) => {
      return{
        color,
        lngLat : marker.getLngLat().toArray()
      }
     });
     localStorage.setItem('plainMarkers',JSON.stringify(plainmarker))

   }
   readToLocalStorage(){
    const plainMakersString = localStorage.getItem('plainMarkers')??'[]';
    const plainMarkers: plainMarker[] = JSON.parse(plainMakersString);

    plainMarkers.forEach( ({color,lngLat}) => {
      const [lng,lat] = lngLat;
      const coords = new LngLat(lng,lat);
      this.addMarkert(coords,color)
    })

   }


}
