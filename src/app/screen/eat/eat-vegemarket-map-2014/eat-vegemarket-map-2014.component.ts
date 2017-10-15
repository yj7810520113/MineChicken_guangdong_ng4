import {Component, OnInit, ViewChild} from '@angular/core';
import {FileReaderService} from "../../../service/file-reader.service";
import {EatFileReaderService} from "../eat-file-reader.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-eat-vegemarket-map-2014',
  templateUrl: './eat-vegemarket-map-2014.component.html',
  styleUrls: ['./eat-vegemarket-map-2014.component.css']
})
export class EatVegemarketMap2014Component implements OnInit {



  @ViewChild('svg') private svg;




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
      this.eatFileReaderService.getEatVegeMarketMapData2014()
    )
      .subscribe(res => {
        //res[0]为topojson
        //res[1]为数据
        // console.log(res)
        this.render(res[0],res[1]);
      });
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

    // console.log(filter)
    filter.forEach((el)=> {

//                let obj = {};
      el.lng = this.projection([+el.lng, +el.lat])[0];
      el.lat = this.projection([+el.lng, +el.lat])[1];

    });
    // console.log(filter)

    this.svg.append('g')
      .selectAll('circle')
      .data(filter)
      .enter().append('circle')
    //                .attr('class', 'hexes')
    //                .attr('transform', function(d) { return 'translate(' + d.x + ', ' + d.y + ')'; })
    //                .attr('d', hexbin.hexagon())
      .style('fill', 'red')
      //                .style('fill', function(d) {
      //                    if(d.datapoints==0){
      //                        return '#fff';
      //                    }
      //                    else
      //                        return colourScale(d.datapoints);
      //                })
      .attr("cx",d=>d.lng)
      .attr("cy",d=>d.lat)
      .attr("r",2)
//                .style('stroke', 'red')
//                .style('stroke-width', 5);

  } // drawHexmap()



  prepData(topo) {

    let geo = topojson.feature(topo, topo.objects.foshang);

    return geo;

  } // prepData()

}
