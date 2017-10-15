import {Component, OnInit, ViewChild} from '@angular/core';
import {EatFileReaderService} from "../eat-file-reader.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-eat-place-type-compare',
  templateUrl: './eat-place-type-compare.component.html',
  styleUrls: ['./eat-place-type-compare.component.css']
})
export class EatPlaceTypeCompareComponent implements OnInit {
  @ViewChild('echart1') echart1;
  @ViewChild('echart2') echart2;
  busy1: Subscription;
  busy2:Subscription;
  private echart1Height=400;
  private echart1Width=800;
  private echart2Height=400;
  private echart2Width=400;

  constructor(private eatFileReaderService:EatFileReaderService) { }

  ngOnInit() {
    // this.echart1.nativeElement.style.height=this.echart1Height+'px';
    // this.echart1.nativeElement.style.width=this.echart1Width+'px';
    // this.echart2.nativeElement.style.height=this.echart2Height+'px';
    // this.echart2.nativeElement.style.width=this.echart2Width+'px';


    // console.log(this.echart1.nativeElement.style.height)

    this.busy1=Observable.forkJoin(
      this.eatFileReaderService.getEatPlaceMapData1(),
      this.eatFileReaderService.getEatPlaceMapData2014()
    ).subscribe(res=>{
      this.renderBar(res[1],res[0]);
    })

    this.busy2=Observable.forkJoin(
      this.eatFileReaderService.getEatPlaceMapData1(),
      this.eatFileReaderService.getEatPlaceMapData2014()
    ).subscribe(res=>{
      this.renderPie1(this.echart2.nativeElement);
    })

    // this.busy3=Observable.forkJoin(
    //   this.eatFileReaderService.getEatPlaceMapData1(),
    //   this.eatFileReaderService.getEatPlaceMapData2014()
    // ).subscribe(res=>{
    //   this.renderPie2014(this.echart2.nativeElement,res[1]);
    // })
  }

  renderPie1(echartEle){
    let Chart2 = echarts.init(echartEle);
    Chart2.setOption(this.option2);
  }


  renderBar(data2014,data2017){
    let Chart1 = echarts.init(this.echart1.nativeElement);
    Chart1.setOption(this.option1);
  }

  //柱状图的option
  option1={
    title: {
      text: '柱状图动画延迟'
    },
    legend: {
      data: ['2014年', '2017年','增长率'],
      align: 'left'
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      // formatter:'{c2}%'
    },
    xAxis: {
      data: ["小吃店","中型餐馆","快餐店","大型餐馆","食堂","小型餐馆","饮品店","特大型餐馆","集体用餐配送","烧卤熟食店","甜品店"],
      silent: false,
      splitLine: {
        show: false
      },
      type: "category",
      position: "bottom",
      inverse: false,
      splitArea: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        inside: false,
        textStyle: {
          color: "#000",
          fontSize: 12
        },
        interval: 0,
        rotate: -45
      },
      axisTick: {
        show: true
      },
      boundaryGap: true
    },
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: '数量（家）',
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle:{
            type:'dashed',
          }
        },
      },
      {
        type: 'value',
        scale: true,
        name: '增长率（%）',
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
      }
    ],
    series: [{
      name: '2014年',
      yAxisIndex: 0,
      type: 'bar',
      data: [378,426,131,202,377,353,194,16,5,0,11],
      animationDelay: function (idx) {
        return idx * 10;
      }
    }, {
      name: '2017年',
      yAxisIndex: 0,
      type: 'bar',
      data: [1946, 1643, 434, 799, 1315, 1443, 880, 48, 12, 1, 12],
      animationDelay: function (idx) {
        return idx * 10 + 100;
      }
    },
      {
        name: '增长率',
        yAxisIndex: 1,
        type: 'line',
        data: [418,285,231,295,248,308,353,200,140,100,9],
        animationDelay: function (idx) {
          return idx * 10 + 100;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5;
    }
  };

//  饼图2014和2017的option
  option2={
    backgroundColor: "rgba(255,255,255,0)",
    title: [{
      text: '2014年',
      left: '90%',
      top: '15%',
      textAlign: 'center',
      textBaseline: 'middle',
      textStyle: {
        color: '#999',
        fontWeight: 'normal',
        fontSize: 20
      }
    },
      {
        text: '2072家',
        left: '90%',
        top: '19%',
        textAlign: 'center',
        textBaseline: 'middle',
        textStyle: {
          color: '#999',
          fontWeight: 'normal',
          fontSize: 16
        }
      },
      {
        text: '2017年',
        left: '90%',
        top: '59%',
        textAlign: 'center',
        textBaseline: 'middle',
        textStyle: {
          color: '#999',
          fontWeight: 'normal',
          fontSize: 20
        }
      },
      {
        text: '8475家',
        left: '90%',
        top: '63%',
        textAlign: 'center',
        textBaseline: 'middle',
        textStyle: {
          color: '#999',
          fontWeight: 'normal',
          fontSize: 16
        }
      }],
    // legend: {
    //   data: [
    //     "小吃店",
    //     "中型餐馆",
    //     "快餐店",
    //     "大型餐馆",
    //     "食堂",
    //     "小型餐馆",
    //     "饮品店",
    //     "特大型餐馆",
    //     "集体用餐配送",
    //     "烧卤熟食店",
    //     "甜品店"
    //   ],
    //   align: "left",
    //   left: 50,
    //   top: 50,
    //   orient: "vertical",
    //   textStyle: {
    //     color: "#fff"
    //   }
    // },
    toolbox: {
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      left: 50,
      right: 50,
      top: 50,
      bottom: 50
    },
    series: [
      {
        name: "2014年",
        type: "pie",
        radius: [
          "0%",
          "15%"
        ],
        center: [
          "50%",
          "20%"
        ],
        data: [
          {
            name: "小吃店",
            value: 756
          },
          {
            name: "中型餐馆",
            value: 852
          },
          {
            name: "快餐店",
            value: 262
          },
          {
            name: "大型餐馆",
            value: 404
          },
          {
            name: "食堂",
            value: 754
          },
          {
            name: "小型餐馆",
            value: 706
          },
          {
            name: "饮品店",
            value: 388
          },
          {
            name: "特大型餐馆",
            value: 32
          },
          {
            name: "集体用餐配送",
            value: 10
          },
          {
            name: "烧卤熟食店",
            value: 0
          },
          {
            name: "甜品店",
            value: 22
          }
        ],
        roseType: false,
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12
            }
          }
        }
      },
      {
        name: "2017年",
        type: "pie",
        radius: [
          "0%",
          "40%"
        ],
        center: [
          "50%",
          "60%"
        ],
        data: [
          {
            name: "小吃店",
            value: 2702
          },
          {
            name: "中型餐馆",
            value: 2495
          },
          {
            name: "快餐店",
            value: 696
          },
          {
            name: "大型餐馆",
            value: 1203
          },
          {
            name: "食堂",
            value: 2069
          },
          {
            name: "小型餐馆",
            value: 2149
          },
          {
            name: "饮品店",
            value: 1268
          },
          {
            name: "特大型餐馆",
            value: 80
          },
          {
            name: "集体用餐配送",
            value: 22
          },
          {
            name: "烧卤熟食店",
            value: 1
          },
          {
            name: "甜品店",
            value: 34
          }
        ],
        roseType: false,
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12
            }
          }
        }
      }
    ],
    animationEasing: "elasticOut",
    itemStyle: {
      normal: {
      },
      emphasis: {
        barBorderWidth: 1,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: "rgba(0,0,0,0.5)"
      }
    }
  };
//饼图2014的option
  option3={};
}
