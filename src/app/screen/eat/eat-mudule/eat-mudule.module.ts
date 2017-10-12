import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EatPlaceMapComponent} from "../eat-place-map/eat-place-map.component";
import {EatFileReaderService} from "../eat-file-reader.service";
import {RouterModule} from "@angular/router";
import {eatRouters} from "./eat-Router";
import {EatMainComponent} from "../eat-main/eat-main.component";
import {EatPlaceMap2014Component} from "../eat-place-map-2014/eat-place-map-2014.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(eatRouters)
  ],
  providers:[
    EatFileReaderService
  ],
  declarations: [
    EatMainComponent,
    EatPlaceMapComponent,
    EatPlaceMap2014Component
  ]
})
export class EatMuduleModule { }
