import {Component, OnInit, ViewChild} from '@angular/core';
import {FileReaderService} from "../../../service/file-reader.service";
import {EatFileReaderService} from "../eat-file-reader.service";
import {Observable} from "rxjs/Observable";
import {sum} from "d3-array";

@Component({
  selector: 'app-eat-baby-milk',
  templateUrl: './eat-baby-milk.component.html',
  styleUrls: ['./eat-baby-milk.component.css']
})
export class EatBabyMilkComponent implements OnInit {

  @ViewChild('svg') private svg;
  @ViewChild('echart1') private echart1;
  @ViewChild('echart2') private echart2;
  @ViewChild('echart3') private echart3;
  @ViewChild('echart4') private echart4;
  @ViewChild('echart5') private echart5;
  @ViewChild('echart6') private echart6;
  @ViewChild('echart7') private echart7;


  private tooltipDiv;
  private bodyNode = d3.select('body').node();

  private projection;



  // private margin = { top: 10, right: 10, bottom: 10, left: 10 };
  private svgHeight= 400;
  private svgWidth = 400;


  //切割路径，防止溢出
  private defs;

  private babyRegex=new RegExp('(含婴幼儿配方乳粉)|(仅售婴幼儿配方乳粉)|(含婴幼儿乳粉)|(含现婴幼儿配方乳粉)|(包含婴幼儿配方乳粉)');
  private townPopulationMap=new Map();



  constructor(private fileReaderSerivce:FileReaderService,private  eatFileReaderService:EatFileReaderService) { }

  ngOnInit() {
    // 桂城街道	542775
    // 罗村街道	177801
    // 九江镇	170179
    // 西樵镇	221670
    // 丹灶镇	154955
    // 狮山镇	432713
    // 大沥镇	614837
    // 里水镇	273914
    // 出生率为 12.95‰

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
      this.eatFileReaderService.getEatBabyMilkData()
    )
      .subscribe(res => {
        //res[0]为topojson
        //res[1]为数据
        // console.log(res)
        let filter=res[1].filter(d1=>{
          // console.log(d1['经营项目'])
          return (this.babyRegex.test(d1['经营项目']))&&(!(d1['经营项目'].indexOf('不含婴幼儿配方乳粉')>=0)&&!(d1['经营项目'].indexOf('不含婴幼儿乳粉')>=0));
        });
        this.render(res[0],filter);
      });

    //baby的奶粉店,新生儿占比
    Observable.forkJoin(
      this.fileReaderSerivce.getTopoData(),
      this.eatFileReaderService.getEatBabyMilkData()
    )
      .subscribe(res => {
        //res[0]为topojson
        //res[1]为数据
        // console.log(res)
        let filter=res[1].filter(d1=>{
          // console.log(d1['经营项目'])
          return (this.babyRegex.test(d1['经营项目']))&&(!(d1['经营项目'].indexOf('不含婴幼儿配方乳粉')>=0)&&!(d1['经营项目'].indexOf('不含婴幼儿乳粉')>=0));
        });
        this.renderPie(filter);
      });
  }

  renderPie(data){
    let sumPopulation=2588844;
    let bornPercentage=0.01207;
    let townMap=new Map();
    let sumTownShop=0;
    data.forEach(d=>{
      sumTownShop++;
      if(townMap.has(d.town)){
        townMap.set(d.town,townMap.get(d.town)+1);
      }
      else{
        townMap.set(d.town,1);
      }
    });

    let count=1;
    for(let key of Array.from(this.townPopulationMap.keys())){
      // let  option = {
      //   // tooltip: {
      //   //     trigger: 'item',
      //   //     formatter: function(params, ticket, callback) {
      //   //         var res = params.seriesName;
      //   //         res += '<br/>' + params.name + ' : ' + params.percent + '%';
      //   //         return res;
      //   //     }
      //
      //   // },
      //   //   backgroundColor:'#0f2d55',
      //   textStyle:{
      //     color:'#fff'
      //   },
      //   itemStyle: {
      //     normal: {
      //       color: '#c23531',
      //       shadowBlur: 10,
      //       zlevel :10,
      //       shadowColor: 'fcc',
      //       avoidLabelOverlap :true,
      //       shadowOffsetY :'5'
      //     }
      //   },
      //   // grid: {
      //   //   bottom: '20%',
      //   //   left:'10%'
      //   // },
      //
      //   //     title: [{
      //   //     text: '已结案',
      //   //     subtext:'75',
      //   //     left: '19%',
      //
      //   //     top: '66%',
      //   //     textAlign:'center',
      //   //     textStyle: {
      //   //         color: '#fff',
      //   //         textAlign:'center',
      //   //     },
      //   //      subtextStyle:{
      //   //         color: '#fff',
      //   //     }
      //
      //   // }, {
      //   //     text: '未结案',
      //   //     subtext:'75',
      //   //     left: '50%',
      //   //     top: '66%',
      //   //     textAlign: 'center',
      //   //     textStyle: {
      //   //         color: '#fff'
      //   //     },
      //   //      subtextStyle:{
      //   //         color: '#fff',
      //   //     }
      //   // }],
      //   // xAxis: [{
      //   //     type: 'category',
      //   //     axisLine: {
      //   //         show: false
      //   //     },
      //   //     axisTick: {
      //   //         show: false
      //   //     },
      //   //     axisLabel: {
      //   //         interval: 0
      //   //     },
      //   //     data: ['正常', '同班']
      //   // }],
      //   // yAxis: [{
      //   //     show: false
      //   // }],
      //
      //   series: [{
      //     name: '人口',
      //
      //     itemStyle: {
      //       normal: {
      //         color: '#01b0d1'
      //       }
      //     },
      //     center: [
      //       '50.0%',
      //       '50%'
      //     ],
      //
      //     radius: [
      //       '75%',
      //       '90%'
      //     ],
      //     type: 'pie',
      //
      //     labelLine: {
      //       normal: {
      //         show: false
      //       }
      //     },
      //
      //     data: [{
      //       color: ['#f60'],
      //       value: this.townPopulationMap.get(key)*bornPercentage,
      //       name: key,
      //       label: {
      //         normal: {
      //           formatter: '{d} %',
      //           position: 'center',
      //           show: true,
      //           textStyle: {
      //             fontSize: '20',
      //             fontWeight: 'bold',
      //             color: '#fff'
      //           }
      //         }
      //       }
      //     }, {
      //       value: Math.round(sumPopulation*bornPercentage),
      //       tooltip: {
      //         show: false
      //       },
      //       itemStyle: {
      //         normal: {
      //           color: '#465262'
      //         },
      //         emphasis: {
      //           color: '#0e1c3d'
      //         }
      //       },
      //
      //       hoverAnimation: false
      //     }]
      //   },
      //     {
      //       name: '婴幼儿奶粉店',
      //
      //       itemStyle: {
      //         normal: {
      //           color: '#01b0d1'
      //         }
      //       },
      //       center: [
      //         '50.0%',
      //         '50%'
      //       ],
      //
      //       radius: [
      //         '55%',
      //         '70%'
      //       ],
      //       type: 'pie',
      //
      //       labelLine: {
      //         normal: {
      //           show: false
      //         }
      //       },
      //
      //       data: [{
      //         color: ['#f60'],
      //         value: townMap.get(key),
      //         name: key,
      //         label: {
      //           normal: {
      //             formatter: '{d} %',
      //             position: 'center',
      //             show: true,
      //             textStyle: {
      //               fontSize: '20',
      //               fontWeight: 'bold',
      //               color: '#fff'
      //             }
      //           }
      //         }
      //       }, {
      //         value: sumTownShop,
      //         tooltip: {
      //           show: false
      //         },
      //         itemStyle: {
      //           normal: {
      //             color: '#465262'
      //           },
      //           emphasis: {
      //             color: '#0e1c3d'
      //           }
      //         },
      //
      //         hoverAnimation: false
      //       }]
      //     }]
      //
      // };



      let option = {
        tooltip: {
          trigger: 'item',
          formatter: function(params, ticket, callback) {
            console.log(params)
            var res = params.seriesName;
            res += '<br/>' + params.name + ': ' + params.value+'<br/>' + params.name + '占比: ' + params.percent+"%";
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

        series: [{
          name: '出生人口',

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
            value: Math.round(this.townPopulationMap.get(key)*bornPercentage),
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
            value: Math.round(sumPopulation*bornPercentage),
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
            name: '婴幼儿奶粉店',

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
              value: townMap.get(key),
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
              value:  sumTownShop,
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


      echarts.init(eval("this.echart"+count+".nativeElement")).setOption(option);
      count++;

    }





  }

  render(topojson,data){
    let topojson1 = this.prepData(topojson);

    this.drawGeo(topojson1);
    this.drawCircle(data);



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

    // console.log(data)

    let filter=data;

    // let filter=Object.assign({},data);
    // console.log(filter)
//     filter.forEach((el)=> {
//
// //                let obj = {};
//       el.lng = this.projection([+el.lng, +el.lat])[0];
//       el.lat = this.projection([+el.lng, +el.lat])[1];
//
//     });
    // console.log(filter)
    //EF476F

    // console.log(filter)
    this.svg.append('g')
      .selectAll('circle')
      .data(filter)
      .enter().append('circle')
          // .attr('xlink:href','./assets/img/奶粉.png')
      //                .attr('class', 'hexes')
      //                .attr('transform', function(d) { return 'translate(' + d.x + ', ' + d.y + ')'; })
      //                .attr('d', hexbin.hexagon())
      // .style('fill', 'red')
      //                .style('fill', function(d) {
      //                    if(d.datapoints==0){
      //                        return '#fff';
      //                    }
      //                    else
      //                        return colourScale(d.datapoints);
      //                })
      // .attr('transform',d=>'translate('+d.lng+',')
      .attr("r","3")
      .attr("cx",d=>this.projection([+d.lng, +d.lat])[0])
      .attr("cy",d=>this.projection([+d.lng, +d.lat])[1])
      // .attr("transform","scale(0.01)")
      .attr("fill",'#EF476F')
      .on('mouseover',d=>{
        // console.log('mouseover')
        d3.select('body').selectAll('div.mytooltip').remove();
        // Append tooltip
        this.tooltipDiv = d3.select('body')
          .append('div')
          .attr('class', 'mytooltip')
        let absoluteMousePos = d3.mouse(this.bodyNode);
        // console.log(absoluteMousePos)
        // this.tooltipDiv.style({
        //   'left': (absoluteMousePos[0] + 10)+'px',
        //   'top': (absoluteMousePos[1] - 40)+'px',
        //   'background-color': '#d8d5e4',
        //   'width': '65px',
        //   'height': '30px',
        //   'padding': '5px',
        //   'position': 'absolute',
        //   'z-index': 1001,
        //   'box-shadow': '0 1px 2px 0 #656565'
        // });

        this.tooltipDiv.style('left',(absoluteMousePos[0] + 10)+'px');
        this.tooltipDiv.style('top',(absoluteMousePos[1] - 40)+'px');
        this.tooltipDiv.style('background-color','#000');
        this.tooltipDiv.style('color','#fff');
        this.tooltipDiv.style('width','200px');
        this.tooltipDiv.style('height','60  px');
        this.tooltipDiv.style('padding','5px');
        this.tooltipDiv.style('position','absolute');
        this.tooltipDiv.style('font-size','12px');
        this.tooltipDiv.style('z-index',10001);
        this.tooltipDiv.style('box-shadow','0 1px 2px 0 #656565');


        // console.log(this.tooltipDiv.style())

        let first_line = '2017年<br>'
        let second_line = '婴幼儿奶粉店名：<br><span style="color:#d94e5d">'+d['名称']+'</span><br>经营项目:<br><span style="color:#d94e5d">'+d['经营项目']+'</span>';

        // console.log(this.tooltipDiv)
        this.tooltipDiv.html(first_line + second_line)
      })
      .on('mouseout',d=>{
        this.tooltipDiv.remove()
      });
//                .style('stroke', 'red')
//                .style('stroke-width', 5);

  } // drawHexmap()



  prepData(topo) {

    let geo = topojson.feature(topo, topo.objects.foshang);

    return geo;

  } // prepData()



}
