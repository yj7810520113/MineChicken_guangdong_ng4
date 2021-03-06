import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {FileReaderService} from "../../../service/file-reader.service";
import {EatFileReaderService} from "../eat-file-reader.service";

@Component({
  selector: 'app-eat-place-map-2014',
  templateUrl: './eat-place-map-2014.component.html',
  styleUrls: ['./eat-place-map-2014.component.css']
})
export class EatPlaceMap2014Component implements OnInit {
  @ViewChild('svg') private svg;


  private tooltipDiv;
  private bodyNode = d3.select('body').node();

  private projection;
  private hexRadius;
  private hexbin;
  private colourScale;


  private margin = { top: 10, right: 10, bottom: 10, left: 10 };
  private svgHeight= 400;
  private svgWidth = 400;
  private colNum=40;
  private rowNum=55;

  //切割路径，防止溢出
  private defs;


  constructor(private fileReaderSerivce:FileReaderService,private  eatFileReaderService:EatFileReaderService) { }

  ngOnInit() {
    // this.svg.nativeElement.setAttribute('height',this.svgHeight);
    // this.svg.nativeElement.setAttribute('width',this.svgWidth);
    this.defs=d3.select(this.svg.nativeElement).append("defs");
    this.svg = d3.select(this.svg.nativeElement)
      .attr('width', this.svgWidth)
      .attr('height', this.svgHeight)
      .append('g')
    // .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');

    //餐饮服务单位2014
    Observable.forkJoin(
      this.fileReaderSerivce.getTopoData(),
      this.eatFileReaderService.getEatPlaceMapData2014()
    )
      .subscribe(res => {
        //res[0]为topojson
        //res[1]为数据
        // console.log(res)
        this.render(res[0],res[1]);
      });

    //  监听地图联动
    this.eatFileReaderService.getSelectFormSubject()
      .subscribe(x=>{
          // if(x[0]=='食品流通企业'){
          Observable.forkJoin(
            this.fileReaderSerivce.getTopoData(),
            this.eatFileReaderService.getEatPlaceMapData2014(),
            this.eatFileReaderService.getEatBabyMilkData2014()
          )
            .subscribe(x1=>{
              let index=1;
              if(x[0]=='餐饮服务单位'){
                index=1;
              }
              else {
                index=2;
              }
              // console.log(index)
              if(x[1]=='小'){
                this.rowNum=30;
                this.colNum=20;
              }
              else if(x[1]=='中'){
                this.rowNum=55;
                this.colNum=40;
              }
              else {
                this.rowNum=100;
                this.colNum=80;
              }
              let topojson = this.prepData(x1[0]);
              let points = this.createPointGrid(this.rowNum, this.colNum);
              // console.log(points)
//
              let polygonPoints = this.getPolygonPoints(topojson);

              // console.log(polygonPoints)
              let usPoints = this.keepPointsInPolygon(points, polygonPoints);
              // console.log(usPoints)

              let dataPoints = this.getDatapoints(x[2]==''?x1[index]:x1[index].filter(result=>{
                if(x[2]=='全部'){
                  return true;
                }
                return result['类型'].trim()==x[2];
              }))

              // console.log(dataPoints.sort((a,b)=>a.x-b.x))
              let mergedPoints = usPoints.concat(dataPoints)
              // console.log(mergedPoints)


              let hexPoints = this.getHexpoints(mergedPoints);
              // console.log(hexPoints)


              let hexPointsWithCount = this.getHexpointsWithCount(hexPoints);



              this.reDrawHexmap(hexPointsWithCount);
            })

        }
      )

  }

  render(us, waltest){
    let topojson = this.prepData(us);

    this.drawGeo(topojson);

    let points = this.createPointGrid(this.rowNum, this.colNum);
    // console.log(points)
//
    let polygonPoints = this.getPolygonPoints(topojson);

    // console.log(polygonPoints)
    let usPoints = this.keepPointsInPolygon(points, polygonPoints);
    // console.log(usPoints)

    let dataPoints = this.getDatapoints(waltest)

    // console.log(dataPoints.sort((a,b)=>a.x-b.x))
    let mergedPoints = usPoints.concat(dataPoints)
    // console.log(mergedPoints)


    let hexPoints = this.getHexpoints(mergedPoints);
    // console.log(hexPoints)


    let hexPointsWithCount = this.getHexpointsWithCount(hexPoints);



    this.drawHexmap(hexPointsWithCount);
//        drawHexmap(getHexpoints(usPoints));

  }


  /* Functions */
  /* --------- */

  drawHexmap(points) {

    // console.log(points)

    let hexes = this.svg.append('g').attr('class', 'hexes')
      .selectAll('.hex')
      .data(points.filter(d=>{
        return d.datapoints>0;
      }))
      .enter().append('path')
      .attr('class', 'hexes')
      .attr('transform', (d)=>{ return 'translate(' + d.x + ', ' + d.y + ')'; })
      .attr('d', this.hexbin.hexagon())
      .style('fill', '#ddd')
      .style('fill', (d) =>{
        if(d.datapoints==0){
          // console.log("1111111111111111111111")
          return '#fff';
        }
        else
          return this.colourScale(d.datapoints);
      })
      .style('stroke', '#999')
      .style('stroke-width', 1)
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
        this.tooltipDiv.style('width','90px');
        this.tooltipDiv.style('height','60  px');
        this.tooltipDiv.style('padding','5px');
        this.tooltipDiv.style('position','absolute');
        this.tooltipDiv.style('font-size','12px');
        this.tooltipDiv.style('z-index',10001);
        this.tooltipDiv.style('box-shadow','0 1px 2px 0 #656565');


        // console.log(this.tooltipDiv.style())

        let first_line = '2017年<br>'
        let second_line = '该蜂窝格网附近有：<span style="color:#d94e5d">'+d.datapoints+"</span>家店铺"

        // console.log(this.tooltipDiv)
        this.tooltipDiv.html(first_line + second_line)
      })
      .on('mouseout',d=>{
        this.tooltipDiv.remove()
      });

  } // drawHexmap()

  reDrawHexmap(points) {
    // console.log(this.svg.select('.hexes'))
    this.svg.select('.hexes').selectAll('*').remove();
    let hexes = this.svg.select('.hexes')
      .selectAll('.hex')
      .data(points.filter(d=>{
        return d.datapoints>0;
      }))
      .enter().append('path')
      .attr('class', 'hex')
      .attr('transform', (d)=>{ return 'translate(' + d.x + ', ' + d.y + ')'; })
      .attr('d', this.hexbin.hexagon())
      .style('fill', '#ddd')
      .style('fill', (d) =>{
        if(d.datapoints==0){
          return '#fff';
        }
        else
          return this.colourScale(d.datapoints);
      })
      .style('stroke', '#999')
      .style('stroke-width', 1)
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
        this.tooltipDiv.style('width','90px');
        this.tooltipDiv.style('height','60  px');
        this.tooltipDiv.style('padding','5px');
        this.tooltipDiv.style('position','absolute');
        this.tooltipDiv.style('font-size','12px');
        this.tooltipDiv.style('z-index',10001);
        this.tooltipDiv.style('box-shadow','0 1px 2px 0 #656565');


        // console.log(this.tooltipDiv.style())

        let first_line = '2017年<br>'
        let second_line = '该蜂窝格网附近有：<span style="color:#d94e5d">'+d.datapoints+"</span>家店铺"

        // console.log(this.tooltipDiv)
        this.tooltipDiv.html(first_line + second_line)
      })
      .on('mouseout',d=>{
        this.tooltipDiv.remove()
      });

  } // drawHexmap()


  getHexpointsWithCount(data) {

    let maxCount = 0; // for colourScale

    data.forEach((el) =>{

      let count = 0;

      el.forEach((elt) =>{
        if (elt.datapoint === 1) count++;
      })

      el.datapoints = count;

      maxCount = Math.max(maxCount, count); // for colourScale

    });

    // create colourScale as soon as maximum number of datapoints is determined

    this.colourScale = d3.scaleLog().domain([1, maxCount]).range(['#ffe0b2', '#F71735']).interpolate(d3.interpolateHcl);

    return data;

  } // getHexpointsWithCount()


  getHexpoints(points) {

    this.hexbin = d3.hexbin() // note: global
      .radius(this.hexRadius)
      .x((d) =>{ return d.x; })
      .y((d)=> { return d.y; });

    let hexPoints = this.hexbin(points);

    return hexPoints;

  } // getHexpoints()


  getDatapoints(data) {

    let dataPoints = []
    data.forEach((el) =>{

      let obj = {x:0,y:0,datapoint:0};
      obj.x = this.projection([+el.lng, +el.lat])[0];
      obj.y = this.projection([+el.lng, +el.lat])[1];
      obj.datapoint = 1;

      dataPoints.push(obj);

    });

    return dataPoints;

  } // getDatapoints()


  keepPointsInPolygon(points, polygon) {

    let pointsInPolygon = [];
    points.forEach((el)=> {

      let inPolygon = d3.polygonContains(polygon, [el.x, el.y]);
      if (inPolygon) pointsInPolygon.push(el);

    });

    return pointsInPolygon;

  } // keepPointsInPolygon()


  drawPointGrid(data) {
//        d3.geoClipPolygon({
//            type: "Polygon",
//            coordinates: [[[-10, -10], [-10, 10], [10, 10], [10, -10], [-10, -10]]]
//        })


    this.svg.append('g').attr('id', 'circles')
      .selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('cx', (d) =>{ return d.x; })
      .attr('cy', (d)=> { return d.y; })
      .attr('r', 1)
      .attr('fill', 'tomato');

  } // drawPointGrid()


  getPolygonPoints(data) {

    // console.log(data.features[0].geometry)
    let features = data.features[0].geometry.coordinates[0];

    let polygonPoints = []
    features.forEach((el) =>{
      polygonPoints.push(this.projection(el));
    });

    return polygonPoints;

  } // getPolygonPoints()


  createPointGrid(rowNum, colNum) {

    let rows = rowNum,
      columns = colNum;

    this.hexRadius = Math.min(this.svgWidth/((columns + 0.5) * Math.sqrt(3)), this.svgHeight/((rows + 1/3) * 1.5)); // note: global

    let points = [],
      index = -1;

    d3.range(rows).forEach((row)=>{
      d3.range(columns).forEach((col)=>{
        let obj = {x:0,y:0,datapoint:0};
        // obj.x = hexRadius * col * Math.sqrt(3);
        obj.x = this.hexRadius * col * 1.7;
        obj.y = this.hexRadius * row * 1.5;
        obj.datapoint = 0;
        points.push(obj)
      });
    });

    return points;

  } // createPointGrid()


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


  prepData(topo) {

    let geo = topojson.feature(topo, topo.objects.foshang);

    return geo;

  } // prepData()


}
