import { Component } from '@angular/core';

interface MenuItem{
  route:string;
  name:string;

}

@Component({
  selector: 'components-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public menuItem : MenuItem[] =  [
    {route: '/maps/fullscreen',name:'full screen' },
    {route: '/maps/zoom-range',name:'zoom range' },
    {route: '/maps/makers',name:'Makers' },
    {route: '/maps/properties',name:'Houses' },
   ]




}
