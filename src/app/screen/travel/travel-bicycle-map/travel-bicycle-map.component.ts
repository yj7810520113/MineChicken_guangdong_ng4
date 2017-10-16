import {Component, OnInit, ViewChild} from '@angular/core';
import {FileReaderService} from "../../../service/file-reader.service";
import {TravelFileReaderService} from "../travel-file-reader.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-travel-bicycle-map',
  templateUrl: './travel-bicycle-map.component.html',
  styleUrls: ['./travel-bicycle-map.component.css']
})
export class TravelBicycleMapComponent implements OnInit {


  @ViewChild('svg') private svg;
  @ViewChild('echart') private echart;
  @ViewChild('echart1') private echart1;
  @ViewChild('echart2') private echart2;
  @ViewChild('echart3') private echart3;
  @ViewChild('echart4') private echart4;
  @ViewChild('echart5') private echart5;
  @ViewChild('echart6') private echart6;
  @ViewChild('echart7') private echart7;

  private bicycleStationRadius=300;
  private busStationSum=0;
  private validRadiusPercentage=0;
  private townPopulationMap=new Map();





  private projection;



  // private margin = { top: 10, right: 10, bottom: 10, left: 10 };
  private svgHeight= 480;
  private svgWidth = 480;


  //切割路径，防止溢出
  private defs;

  private babyRegex=new RegExp('(含婴幼儿配方乳粉)|(仅售婴幼儿配方乳粉)|(含婴幼儿乳粉)|(含现婴幼儿配方乳粉)|(包含婴幼儿配方乳粉)');


  constructor(private fileReaderSerivce:FileReaderService,private  travelFileReaderService:TravelFileReaderService) { }

  ngOnInit() {
    this.townPopulationMap.set("桂城街道",542775);
    // this.townPopulationMap.set("罗村街道",542775);
    this.townPopulationMap.set("九江镇",170179);
    this.townPopulationMap.set("西樵镇",221670);
    this.townPopulationMap.set("丹灶镇",154955);
    this.townPopulationMap.set("狮山镇",610514);
    this.townPopulationMap.set("大沥镇",614837);
    this.townPopulationMap.set("里水镇",273914);


    this.defs=d3.select(this.svg.nativeElement).append("defs");
    this.svg = d3.select(this.svg.nativeElement)
      .attr('width', this.svgWidth)
      .attr('height', this.svgHeight)
      .append('g');


    //baby的奶粉店,地理展示
    Observable.forkJoin(
      this.fileReaderSerivce.getTopoData(),
      this.travelFileReaderService.getTravelPlaceMapData1(),
      this.travelFileReaderService.getTravelBusMapData1(),
    )
      .subscribe(res => {
        //res[0]为topojson
        //res[1]为数据
        // console.log(res)
        this.render(res[0],res[1],res[2]);
        this.calculate(res[1],res[2]);
      });
  }

  //data1为公共自行车站点，data2为公交车站点
  calculate(data1,data2) {
    this.busStationSum = data2.length;
    // let count = 0;
    let filter = data2.filter(d => {
      for (let d1 of data1) {
        if (Math.abs(d1['lng'] - d['lng']) < 0.03 && Math.abs(d1['lat'] - d['lat']) < 0.03) {
          if (this.getDistanceFromLatLonInKm(d1['lat'], d1['lng'], d['lat'], d['lng']) * 1000 <= this.bicycleStationRadius) {
            count++;
            return true;
          }
        }
      }
      return false;
    });

    let townBicycleMap = new Map();
    // let sumTownShop=0;
    data1.forEach(d => {
      if (townBicycleMap.has(d.town)) {
        townBicycleMap.set(d.town, townBicycleMap.get(d.town) + 1);
      }
      else {
        townBicycleMap.set(d.town, 1);
      }
    });

    let townBusMap = new Map();
    // let sumTownShop=0;
    data2.forEach(d => {
      if (townBusMap.has(d.town)) {
        townBusMap.set(d.town, townBusMap.get(d.town) + 1);
      }
      else {
        townBusMap.set(d.town, 1);
      }
    });

    let sumPopulation = 2588844;
    //  画图
    let count=1;
    for (let key of Array.from(this.townPopulationMap.keys())) {

      let option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params, ticket, callback) {
              console.log(params)
                var res = params.seriesName;
                res += '<br/>' + params.name + ' : ' + params.value+'<br/>' + params.name + ' 占比: ' + params.percent+"%";
                return res;
            }

        },
        //   backgroundColor:'#0f2d55',
        // textStyle: {
        //   color: '#fff'
        // },
        itemStyle: {
          normal: {
            color: '#c23531',
            shadowBlur: 10,
            zlevel: 10,
            shadowColor: 'fcc',
            avoidLabelOverlap: true,
            shadowOffsetY: '5'
          }
        },
        // grid: {
        //   bottom: '20%',
        //   left:'10%'
        // },

        //     title: [{
        //     text: '已结案',
        //     subtext:'75',
        //     left: '19%',

        //     top: '66%',
        //     textAlign:'center',
        //     textStyle: {
        //         color: '#fff',
        //         textAlign:'center',
        //     },
        //      subtextStyle:{
        //         color: '#fff',
        //     }

        // }, {
        //     text: '未结案',
        //     subtext:'75',
        //     left: '50%',
        //     top: '66%',
        //     textAlign: 'center',
        //     textStyle: {
        //         color: '#fff'
        //     },
        //      subtextStyle:{
        //         color: '#fff',
        //     }
        // }],
        // xAxis: [{
        //     type: 'category',
        //     axisLine: {
        //         show: false
        //     },
        //     axisTick: {
        //         show: false
        //     },
        //     axisLabel: {
        //         interval: 0
        //     },
        //     data: ['正常', '同班']
        // }],
        // yAxis: [{
        //     show: false
        // }],

        series: [{
          name: '人口',

          itemStyle: {
            normal: {
              color: '#118AB2'
            }
          },
          center: [
            '50.0%',
            '50%'
          ],

          radius: [
            '75%',
            '90%'
          ],
          type: 'pie',

          labelLine: {
            normal: {
              show: false
            }
          },

          data: [{
            color: ['#f60'],
            value: this.townPopulationMap.get(key),
            name: key,
            label: {
              normal: {
                show: false,
                textStyle: {
                  fontSize: 12
                }
              }
            },
          }, {
            value: Math.round(sumPopulation),
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: 'rgba(14, 15, 45, 0.95)'
              },
              emphasis: {
                color: 'rgba(14, 15, 45, 0.95)'
              }
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  fontSize: 12
                }
              }
            },
            hoverAnimation: false
          }]
        },
          {
            name: '公交站站点数',

            itemStyle: {
              normal: {
                color: '#06D6A0'
              }
            },
            center: [
              '50.0%',
              '50%'
            ],

            radius: [
              '60%',
              '75%'
            ],
            type: 'pie',

            labelLine: {
              normal: {
                show: false
              }
            },

            data: [{
              color: ['#f60'],
              value: townBusMap.get(key),
              name: key,
              label: {
                normal: {
                  show: false,
                  textStyle: {
                    fontSize: 12
                  }
                }
              },
            }, {
              value:  data2.length,
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: 'rgba(14, 15, 45, 0.95)'
                },
                emphasis: {
                  color: 'rgba(14, 15, 45, 0.95)'
                }
              },
              label: {
                normal: {
                  show: false,
                  textStyle: {
                    fontSize: 12
                  }
                }
              },
              hoverAnimation: false
            }]
          },


          {
            name: '公共自行车站点数',

            itemStyle: {
              normal: {
                color: '#EF476F'
              }
            },
            center: [
              '50.0%',
              '50%'
            ],

            radius: [
              '45%',
              '60%'
            ],
            type: 'pie',

            labelLine: {
              normal: {
                show: false
              }
            },

            data: [{
              color: ['#f60'],
              value: townBicycleMap.get(key),
              name: key,
              label: {
                normal: {
                  formatter: '{d}',
                  position: 'center',
                  show: false,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold',
                    color: '#fff'
                  }
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 25

                }
              }},
             {
              value: data1.length,
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: 'rgba(14, 15, 45, 0.95)'
                },
                emphasis: {
                  color: 'rgba(14, 15, 45, 0.95)'
                }
              },
               label: {
                 normal: {
                   show: false,
                   textStyle: {
                     fontSize: 12
                   }
                 }
               },
              hoverAnimation: false
            }]
          }
        ]

      };

      // console.log(JSON.stringify(option))
      // console.log("this.echart" + count + ".nativeElement")
      echarts.init(eval("this.echart" + count + ".nativeElement")).setOption(option);
      count++;

    }
  }

  render(topojson,data1,data2){
    let topojson1 = this.prepData(topojson);

    this.drawGeo(topojson1);

    //画出公交站点
    this.drawBus(data2);
    this.svg.append("g")
      .attr("class","bicycle");

    //画出公共自行车站点
    this.drawCircle(data1);



  }


  drawGeo(data){

    // console.log(data.features[0].geometry)
//        let clip=d3.geoClipPolygon(data.features[0].geometry);
    this.projection = d3.geoMercator().fitSize([this.svgWidth, this.svgHeight], data);
//        projection = d3.geoMercator().fitSize([400, 400], data).postclip(clip);;



    let geoPath = d3.geoPath()
      .projection(this.projection)

    this.defs.append("path")
      .attr("id", "land")
      .datum(data)
      .attr("d", geoPath);

    this.defs.append("clipPath")
      .attr("id", "clip")
      .append("use")
      .attr("xlink:href", "#land");
    this.svg=this.svg.append("g")
      .attr("clip-path", "url(#clip)");






//        let projection = d3.geoMercator().fitSize([400, 400], topojson.feature(us,us.objects.foshang));
//        let projection = d3.geoMercator().scale(20).translate([-30,0]);
//        let path = d3.geoPath().projection(projection);

    this.svg
      .append('path')
      .datum(data)
      .attr('d', geoPath)
      .attr('class', 'geoMap')

  } // drawGeo()

  drawCircle(data) {


    let filter=data;
    console.log(this.svg.select(".bicycle"))

    this.svg.select(".bicycle")
      .selectAll('circle')
      .data(filter)
      .enter().append('circle')
    //                .attr('class', 'hexes')
    //                .attr('transform', function(d) { return 'translate(' + d.x + ', ' + d.y + ')'; })
    //                .attr('d', hexbin.hexagon())
      .style('fill', 'none')
      //                .style('fill', function(d) {
      //                    if(d.datapoints==0){
      //                        return '#fff';
      //                    }
      //                    else
      //                        return colourScale(d.datapoints);
      //                })
      .attr("cx",d=>this.projection([+d.lng, +d.lat])[0])
      .attr("cy",d=>this.projection([+d.lng, +d.lat])[1])
      .attr("r",3)
               .style('stroke', '#EF476F')
               .style('stroke-width', 1);

  } // drawHexmap()


  drawBus(data) {


    let filter=data;

    this.svg.append('g')
      .selectAll('circle')
      .data(filter)
      .enter().append('circle')
    //                .attr('class', 'hexes')
    //                .attr('transform', function(d) { return 'translate(' + d.x + ', ' + d.y + ')'; })
    //                .attr('d', hexbin.hexagon())
      .style('fill', 'none')
      //                .style('fill', function(d) {
      //                    if(d.datapoints==0){
      //                        return '#fff';
      //                    }
      //                    else
      //                        return colourScale(d.datapoints);
      //                })
      .attr("cx",d=>this.projection([+d.lng, +d.lat])[0])
      .attr("cy",d=>this.projection([+d.lng, +d.lat])[1])
      .attr("r",1)
      .style('fill', '#06D6A0');
      // .style('stroke-width', 1);

  } // drawHexmap()



  prepData(topo) {

    let geo = topojson.feature(topo, topo.objects.foshang);

    return geo;

  } // prepData()



/*
-----------------------------------------------------------------------
计算经纬度之间的距离

 */
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2-lon1);
    let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}
