import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TravelBicycleMapComponent} from "../travel-bicycle-map/travel-bicycle-map.component";
import {TravelMainComponent} from "../travel-main/travel-main.component";
import {travelRouters} from "./travel-Router";
import {RouterModule} from "@angular/router";
import {TravelFileReaderService} from "../travel-file-reader.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(travelRouters)

  ],
  declarations: [
    TravelMainComponent,
    TravelBicycleMapComponent,

  ],
  providers:[
    TravelFileReaderService,
  ]
})
export class TravelModuleModule { }
