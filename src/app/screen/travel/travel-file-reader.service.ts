import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {NET_CONFIG} from "../../config/net-config";
import {INetConfig} from "../../config/Inet-config";

@Injectable()
export class TravelFileReaderService {

  private shared;
  //
  constructor(private http: Http, @Inject(NET_CONFIG) private net_config: INetConfig) {
    // this.shared=this.sharedVariabel;
  }

  private TravelPlaceMapUrl1:string = 'assets/file/trans公共自行车服务点';

  private TravelPlaceMapdata1;
  private TravelPlaceMapObservable1: Observable<any>;


  private TravelBusMapUrl1:string = 'assets/file/trans公交站点';

  private TravelBusMapdata1;
  private TravelBusMapObservable1: Observable<any>;


  private TravelAQIUrl1:string = 'assets/file/aqi';

  private TravelAQIdata1;
  private TravelAQIObservable1: Observable<any>;



  getTravelPlaceMapData1() {
    if(this.TravelPlaceMapdata1) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.TravelPlaceMapdata1);
    } else if(this.TravelPlaceMapObservable1) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.TravelPlaceMapObservable1;
    } else {
      this.TravelPlaceMapObservable1 = this.readCSVFileToJson(this.TravelPlaceMapUrl1)
        .map(response =>  {
            // when the cached data is available we don't need the `Observable` reference anymore
            this.TravelPlaceMapObservable1 = null;


            this.TravelPlaceMapdata1 =response;
            return this.TravelPlaceMapdata1;
          }
        ).share();
      return this.TravelPlaceMapObservable1;
    }
  }

  getTravelBusMapData1() {
    if(this.TravelBusMapdata1) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.TravelBusMapdata1);
    } else if(this.TravelBusMapObservable1) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.TravelBusMapObservable1;
    } else {
      this.TravelBusMapObservable1 = this.readCSVFileToJson(this.TravelBusMapUrl1)
        .map(response =>  {
            // when the cached data is available we don't need the `Observable` reference anymore
            this.TravelBusMapObservable1 = null;


            this.TravelBusMapdata1 =response;
            return this.TravelBusMapdata1;
          }
        ).share();
      return this.TravelBusMapObservable1;
    }
  }

  getTravelAQIData1() {
    if(this.TravelAQIdata1) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.TravelAQIdata1);
    } else if(this.TravelAQIObservable1) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.TravelAQIObservable1;
    } else {
      this.TravelAQIObservable1 = this.readCSVFileToJson(this.TravelAQIUrl1)
        .map(response =>  {
            // when the cached data is available we don't need the `Observable` reference anymore
            this.TravelAQIObservable1 = null;


            this.TravelAQIdata1 =response;
            return this.TravelAQIdata1;
          }
        ).share();
      return this.TravelAQIObservable1;
    }
  }



  readCSVFileToJson(path:string):any{
    return this.readCDNCSVFileToJson(path);
  }





  //
  // readFileToJson(path: string) {
  //   Observable.fromCSV(path)
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
  readCDNCSVFileToJson(path: string): any {
    console.log("CDN:"+this.net_config.CDN_BASE_URL + path+".csv")
    return this.http.get(this.net_config.CDN_BASE_URL + path+".csv")
      .map((x) => {
        // console.log(x);
        return this.csvToJson(x.text());
      });
  }


  readFileToJson(path: string): any {
    return this.http.get(this.net_config.CSV_BASE_URL + path)
      .map((x) => {
        // console.log(x);
        return this.csvToJson(x.text());
      });
  }

  csvToJson(str: string): any {
    // console.log(str);
    let lines = str.split('\n');
    let result = [];
    let headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
      if(lines[i].trim()!='') {
        var obj = {};
        var objs = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
          obj[(headers[j].replace(/\r/, ''))] = objs[j];
        }
        result.push(obj);
      }


    }
    // console.log('111111111111111');
    // console.log(JSON.stringify(result));
    return result;
  }


}
