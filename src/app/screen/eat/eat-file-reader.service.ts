import {Inject, Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {inject} from "@angular/core/testing";
import {NET_CONFIG} from "../../config/net-config";
import {INetConfig} from "../../config/Inet-config";
import {Observable} from "rxjs/Observable";
import {share} from "rxjs/operator/share";
import {Subject} from "rxjs/Subject";
// import  'rx-from-csv';
// import {Observable} from "rxjs/Observable";

@Injectable()
export class EatFileReaderService {
  //地图之间的交互
  private selectForm=new Subject();
  public getSelectFormSubject(){
    return this.selectForm;
  }
  //data为 数据源类型，蜂窝格网大小，餐饮店类型
  public setSelectFormSubject(data){
    this.selectForm.next(data);
  }



  private shared;
  //
  constructor(private http: Http, @Inject(NET_CONFIG) private net_config: INetConfig) {
    // this.shared=this.sharedVariabel;
  }

  private EatPlaceMapUrl1:string = 'assets/file/trans餐饮服务单位';

  private EatPlaceMapdata1;
  private EatPlaceMapObservable1: Observable<any>;

  private EatPlaceMapUrl2014:string = 'assets/file/trans餐饮服务单位2014';

  private EatPlaceMapdata2014;
  private EatPlaceMapObservable2014: Observable<any>;

  private EatBabyMilkUrl:string = 'assets/file/trans食品流通企业';

  private EatBabyMilkdata;
  private EatBabyMilkObservable: Observable<any>;

  private EatBabyMilkUrl2014:string = 'assets/file/trans食品流通企业2014';

  private EatBabyMilkdata2014;
  private EatBabyMilkObservable2014: Observable<any>;

  private EatVegeMarketMapUrl:string = 'assets/file/trans菜市场';

  private EatVegeMarketMapdata;
  private EatVegeMarketMapObservable: Observable<any>;

  private EatVegeMarketMapUrl2014:string = 'assets/file/trans菜市场2014';

  private EatVegeMarketMapdata2014;
  private EatVegeMarketMapObservable2014: Observable<any>;


  getEatPlaceMapData1() {
    if(this.EatPlaceMapdata1) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.EatPlaceMapdata1);
    } else if(this.EatPlaceMapObservable1) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.EatPlaceMapObservable1;
    } else {
      this.EatPlaceMapObservable1 = this.readCSVFileToJson(this.EatPlaceMapUrl1)
        .map(response =>  {
          // when the cached data is available we don't need the `Observable` reference anymore
          this.EatPlaceMapObservable1 = null;


            this.EatPlaceMapdata1 =response;
            return this.EatPlaceMapdata1;
          }
        ).share();
      return this.EatPlaceMapObservable1;
    }
  }


  getEatPlaceMapData2014() {
    if(this.EatPlaceMapdata2014) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.EatPlaceMapdata2014);
    } else if(this.EatPlaceMapObservable2014) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.EatPlaceMapObservable2014;
    } else {
      this.EatPlaceMapObservable2014 = this.readCSVFileToJson(this.EatPlaceMapUrl2014)
        .map(response =>  {
            // when the cached data is available we don't need the `Observable` reference anymore
            this.EatPlaceMapObservable2014 = null;


            this.EatPlaceMapdata2014 =response;
            return this.EatPlaceMapdata2014;
          }
        ).share();
      return this.EatPlaceMapObservable2014;
    }
  }


  getEatBabyMilkData() {
    if(this.EatBabyMilkdata) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.EatBabyMilkdata);
    } else if(this.EatBabyMilkObservable) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.EatBabyMilkObservable;
    } else {
      this.EatBabyMilkObservable = this.readCSVFileToJson(this.EatBabyMilkUrl)
        .map(response =>  {
            // when the cached data is available we don't need the `Observable` reference anymore
            this.EatBabyMilkObservable = null;


            this.EatBabyMilkdata =response;
            return this.EatBabyMilkdata;
          }
        ).share();
      return this.EatBabyMilkObservable;
    }
  }

  getEatBabyMilkData2014() {
    if(this.EatBabyMilkdata2014) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.EatBabyMilkdata2014);
    } else if(this.EatBabyMilkObservable2014) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.EatBabyMilkObservable2014;
    } else {
      this.EatBabyMilkObservable2014 = this.readCSVFileToJson(this.EatBabyMilkUrl2014)
        .map(response =>  {
            // when the cached data is available we don't need the `Observable` reference anymore
            this.EatBabyMilkObservable2014 = null;


            this.EatBabyMilkdata2014 =response;
            return this.EatBabyMilkdata2014;
          }
        ).share();
      return this.EatBabyMilkObservable2014;
    }
  }


  getEatVegeMarketMapData() {
    if(this.EatVegeMarketMapdata) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.EatVegeMarketMapdata);
    } else if(this.EatVegeMarketMapObservable) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.EatVegeMarketMapObservable;
    } else {
      this.EatVegeMarketMapObservable = this.readCSVFileToJson(this.EatVegeMarketMapUrl)
        .map(response =>  {
            // when the cached data is available we don't need the `Observable` reference anymore
            this.EatVegeMarketMapObservable = null;


            this.EatVegeMarketMapdata =response;
            return this.EatVegeMarketMapdata;
          }
        ).share();
      return this.EatVegeMarketMapObservable;
    }
  }

  getEatVegeMarketMapData2014() {
    if(this.EatVegeMarketMapdata2014) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.EatVegeMarketMapdata2014);
    } else if(this.EatVegeMarketMapObservable2014) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.EatVegeMarketMapObservable2014;
    } else {
      this.EatVegeMarketMapObservable2014 = this.readCSVFileToJson(this.EatVegeMarketMapUrl2014)
        .map(response =>  {
            // when the cached data is available we don't need the `Observable` reference anymore
            this.EatVegeMarketMapObservable2014 = null;


            this.EatVegeMarketMapdata2014 =response;
            return this.EatVegeMarketMapdata2014;
          }
        ).share();
      return this.EatVegeMarketMapObservable2014;
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
