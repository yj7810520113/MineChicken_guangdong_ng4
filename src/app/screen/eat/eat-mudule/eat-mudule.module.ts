import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EatPlaceMapComponent} from "../eat-place-map/eat-place-map.component";
import {EatFileReaderService} from "../eat-file-reader.service";
import {RouterModule} from "@angular/router";
import {eatRouters} from "./eat-Router";
import {EatMainComponent} from "../eat-main/eat-main.component";
import {EatPlaceMap2014Component} from "../eat-place-map-2014/eat-place-map-2014.component";
import {EatPlaceTypeCompareComponent} from "../eat-place-type-compare/eat-place-type-compare.component";
import {BusyConfigFactory} from "../../../config/busy-config-factory";
import {BusyConfig, BusyModule} from "angular2-busy";
import {EatBabyMilkComponent} from "../eat-baby-milk/eat-baby-milk.component";
import {EatVegemarketMapComponent} from "../eat-vegemarket-map/eat-vegemarket-map.component";
import {EatVegemarketMap2014Component} from "../eat-vegemarket-map-2014/eat-vegemarket-map-2014.component";

@NgModule({
  imports: [
    CommonModule,
    BusyModule,
    RouterModule.forChild(eatRouters)
  ],
  providers:[
    EatFileReaderService,
    {provide: BusyConfig, useFactory: BusyConfigFactory},
  ],
  declarations: [
    EatMainComponent,
    EatPlaceMapComponent,
    EatPlaceMap2014Component,
    EatPlaceTypeCompareComponent,
    EatBabyMilkComponent,
    EatVegemarketMapComponent,
    EatVegemarketMap2014Component,

  ]
})
export class EatMuduleModule { }
