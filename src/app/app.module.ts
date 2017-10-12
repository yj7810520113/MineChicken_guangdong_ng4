import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {D3Service} from 'd3-ng2-service';
import {FileReaderService} from "./service/file-reader.service";
import {HttpModule} from "@angular/http";
import {NET_CONFIG, NetConfig} from "./config/net-config";
import {SharedVariableService} from "./service/shared-variable.service";
import {ROAD_PATH_CONFIG, RoadPathConfig} from "./config/road-path-config";
import {ROAD_CONFIG, RoadConfig} from "./config/road-config";
import {HttpService} from "./service/http.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdAutocompleteModule,
  MdButtonModule, MdChipsModule, MdDatepickerModule, MdDialogModule, MdIconModule, MdInputModule, MdNativeDateModule,
  MdSelectModule
} from "@angular/material";
import {BusyConfig, BusyModule} from "angular2-busy";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {Ng2PageScrollModule} from "ng2-page-scroll";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BusyConfigFactory} from "./config/busy-config-factory";
import {StartDialogComponent} from "./screen/dialog/start-dialog/start-dialog.component";
import {appRoutes} from "./app.routers";
import {RouterModule} from "@angular/router";
import { EatMainComponent } from './screen/eat/eat-main/eat-main.component';
import {EatPlaceMapComponent} from "./screen/eat/eat-place-map/eat-place-map.component";
import {EatMuduleModule} from "./screen/eat/eat-mudule/eat-mudule.module";
import { EatPlaceMap2014Component } from './screen/eat/eat-place-map-2014/eat-place-map-2014.component';
import { EatPlaceTypeCompareComponent } from './screen/eat/eat-place-type-compare/eat-place-type-compare.component';


@NgModule({
  declarations: [
    AppComponent,
    StartDialogComponent,
    EatPlaceTypeCompareComponent,
    // EatMainComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    EatMuduleModule,


    MdChipsModule,
    MdIconModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdAutocompleteModule,
    BusyModule,
    // BusyModule,
    // BusyModule.forRoot(
    //   new BusyConfig({
    //     message: '',
    //     // backdrop: false,
    //     template:'<div class="ng-busy-default-wrapper">' +
    //     '<div class="svgSpinner">' +
    //     '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\n' +
    //     '<circle class="loadingPath" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>\n' +
    //     '</svg>' +
    //     '<div class="ng-busy-default-text"></div></div>',        // delay: 200,
    //     // minDuration: 200000,
    //     // wrapperClass: 'my-class'
    //   })
    // ),
    Ng2PageScrollModule,
    NgbModule.forRoot(),
  ],
  providers: [D3Service, SharedVariableService,FileReaderService,HttpService,
    {provide: BusyConfig, useFactory: BusyConfigFactory},
    {
      provide: NET_CONFIG,
      useValue: NetConfig,
    },
    {
      provide:ROAD_PATH_CONFIG,
      useValue:RoadPathConfig,
    },
    {
      provide:ROAD_CONFIG,
      useValue:RoadConfig,
    }],
  entryComponents:[StartDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
