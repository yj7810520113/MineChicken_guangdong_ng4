import {Component, OnInit, ViewChild} from '@angular/core';
import {FileReaderService} from "../../../service/file-reader.service";
import {EatFileReaderService} from "../eat-file-reader.service";
import {Observable} from "rxjs/Observable";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-eat-vegemarket-map',
  templateUrl: './eat-vegemarket-map.component.html',
  styleUrls: ['./eat-vegemarket-map.component.css']
})
export class EatVegemarketMapComponent implements OnInit {


  @ViewChild('svg') private svg;
  @ViewChild('echart') private echart;




  private projection;



  // private margin = { top: 10, right: 10, bottom: 10, left: 10 };
  private svgHeight= 400;
  private svgWidth = 400;


  //切割路径，防止溢出
  private defs;

  private babyRegex=new RegExp('(含婴幼儿配方乳粉)|(仅售婴幼儿配方乳粉)|(含婴幼儿乳粉)|(含现婴幼儿配方乳粉)|(包含婴幼儿配方乳粉)');


  constructor(private fileReaderSerivce:FileReaderService,private  eatFileReaderService:EatFileReaderService) { }

  ngOnInit() {
    this.defs=d3.select(this.svg.nativeElement).append("defs");
    this.svg = d3.select(this.svg.nativeElement)
      .attr('width', this.svgWidth)
      .attr('height', this.svgHeight)
      .append('g');


    //baby的奶粉店,地理展示
    Observable.forkJoin(
      this.fileReaderSerivce.getTopoData(),
      this.eatFileReaderService.getEatVegeMarketMapData(),
      this.eatFileReaderService.getEatVegeMarketMapData2014()
    )
      .subscribe(res => {
        //res[0]为topojson
        //res[1]为数据
        // console.log(res)
        this.render(res[0],res[2],res[1]);
      });
  }

  render(topojson,data2014,data){
    let topojson1 = this.prepData(topojson);

    this.drawGeo(topojson1);
    this.drawCircle(data2014,data);

    let Chart2 = echarts.init(this.echart.nativeElement);
    Chart2.setOption(this.option);

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

  drawCircle(data2014,data) {

    //找出去年存在且今年也存在的点
    let set2014=new Set();
    let set1=new Set();

    //交集
    let unionSet=new Set();
    //新增
    let addSet=new Set();
    //去除
    let delSet=new Set();


    for(let d1 of data2014){
      set2014.add(d1['lng']+','+d1['lat']);
    }
    for(let d1 of data){
      set1.add(d1['lng']+','+d1['lat']);
    }

    set1.forEach(d=>{
      if(set2014.has(d)) {
        unionSet.add(d);
      }
      else{
        addSet.add(d);
      }
    });
    set2014.forEach(d=>{
      if(!set1.has(d)){
        delSet.add(d);
      }
    }
    );
    // console.log(unionSet,addSet,delSet);


    // let filter=Array.from();
    data2014.forEach(d=>{
      if(delSet.has(d['lng']+','+d['lat'])){
        data.push(d);
      }
    });

    console.log(data)
//     data.forEach((el)=> {
//
// //                let obj = {};
//       el.lng = this.projection([+el.lng, +el.lat])[0];
//       el.lat = this.projection([+el.lng, +el.lat])[1];
//
//     });
    let filter=data;

    this.svg.append('g')
      .selectAll('circle')
      .data(filter)
      .enter().append('circle')
    //                .attr('class', 'hexes')
    //                .attr('transform', function(d) { return 'translate(' + d.x + ', ' + d.y + ')'; })
    //                .attr('d', hexbin.hexagon())
      .style('fill', d=>{
        if(unionSet.has(d.lng+','+d.lat)){
          return 'green';
        }
        else if(addSet.has(d.lng+','+d.lat)){
          return 'yellow';
        }
        else if(delSet.has(d.lng+','+d.lat)){
          console.log(d['town'])
          return 'red';
        }
      })
      //                .style('fill', function(d) {
      //                    if(d.datapoints==0){
      //                        return '#fff';
      //                    }
      //                    else
      //                        return colourScale(d.datapoints);
      //                })
      .attr("cx",d=>this.projection([+d.lng, +d.lat])[0])
      .attr("cy",d=>this.projection([+d.lng, +d.lat])[1])
      .attr("r",2)
//                .style('stroke', 'red')
//                .style('stroke-width', 5);

  } // drawHexmap()



  prepData(topo) {

    let geo = topojson.feature(topo, topo.objects.foshang);

    return geo;

  } // prepData()



  option =
    {
      backgroundColor: "rgba(0,0,0,0)",
      title: {
        text: "我是标题，请修改",
        subtext: "",
        backgroundColor: "rgba(0,0,0,0)",
        top: 10,
        left: 10,
        textStyle: {
          fontSize: 18,
          color: "#fff"
        }
      },
      color:[
        'green','red','yellow'
      ],
      legend: {
        data: [
          "2014年","挂掉的","2017年"
        ],
        align: "left",
        left: 200,
        top: 10,
        orient: "horizontal",
        textStyle: {
          color: "#fff"
        }
      },
      toolbox: {
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        data: false,
        silent: false,
        type: "value",
        splitLine: {
          show: true,
          lineStyle:{
            type:'dashed'
          }
        },
        position: "bottom",
        inverse: false,
        splitArea: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          inside: false,
          textStyle: {
            color: "#fff",
            fontSize: 12
          },
          interval: 0,
          rotate: 0
        },
        axisTick: {
          show: true
        },
        boundaryGap: false
      },
      yAxis: {
        data: [
          "桂城街道","罗村街道","九江镇","丹灶镇","狮山镇","大沥镇","里水镇",

        ],
        silent: false,
        type: "category",
        splitLine: {
          show: false
        },
        position: "left",
        inverse: false,
        splitArea: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          inside: false,
          textStyle: {
            color: "#fff",
            fontSize: 12
          },
          interval: 0,
          rotate: 0
        },
        axisTick: {
          show: false
        }
      },
      grid: {
        left: 100,
        right: 50,
        top: 50,
        bottom: 50
      },
      series: [
        {
          name: "2017年",
          type: "bar",
          areaStyle: {
            normal: {
            }
          },
          barGap: "-100%",
          barWidth: "40%",
          stack: null,
          data: [
            30,0,10,5,52,44,32,
          ]
        },
        {
          name: "2014年",
          type: "bar",
          areaStyle: {
            normal: {
            }
          },
          barGap: "-100%",
          barWidth: "40%",
          stack: null,
          data: [
            14,0,4,3,25,14,8,
          ]
        },
        {
          name: "挂掉的",
          type: "bar",
          areaStyle: {
            normal: {
            }
          },
          barGap: "-100%",
          barWidth: "40%",
          stack: null,
          data: [
            0,0,0,0,2,1,0
          ]
        },

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



}