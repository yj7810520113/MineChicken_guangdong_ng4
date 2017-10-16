import {Component, OnInit, ViewChild} from '@angular/core';
import {TravelFileReaderService} from "../travel-file-reader.service";

@Component({
  selector: 'app-travel-aqi',
  templateUrl: './travel-aqi.component.html',
  styleUrls: ['./travel-aqi.component.css']
})
export class TravelAqiComponent implements OnInit {
  @ViewChild('echart') private echart;
  @ViewChild('echart1') private echart1;
  public aqiDates=[0,0,0,0];

  constructor(private  travelFileReaderService:TravelFileReaderService) { }

  ngOnInit() {
    this.travelFileReaderService.getTravelAQIData1()
      .subscribe(res=>{
        this.render(res);
        this.renderPie(res);
      })

  }

  renderPie(data){
    let min50=0;
    let min100=0;
    let min150=0;
    let min200=0;
    data.forEach(d=>{
      if(d.aqi<=50){
        min50++;
      }
      else if(d.aqi<=100){
        min100++;
      }
      else if(d.aqi<=150){
        min150++;
      }
      else if(d.aqi<=200){
        min200++;
      }
    });
    let aqiData=[];
    aqiData.push({name:"空气质量优",value:min50});
    aqiData.push({name:"空气质量良",value:min100});
    aqiData.push({name:"空气质量轻度污染",value:min150});
    aqiData.push({name:"空气质量中度污染",value:min200});
    // aqiData.push({name:"空气质量优",value:min50});
    this.aqiDates=aqiData;

    //echarts
    let dataStyle = {
      normal: {
        label: {show:false},
        labelLine: {show:false},
        shadowBlur: 40,
        shadowColor: 'rgba(40, 40, 40, 0.5)',
      }
    };
    let placeHolderStyle = {
      normal : {
        color: 'rgba(0,0,0,0)',
        label: {show:false},
        labelLine: {show:false}
      },
      emphasis : {
        color: 'rgba(0,0,0,0)'
      }
    };
    var colorList = [
      '#9BC53D','#FDE74C','#FA7921','#E55934'
    ];
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      color:colorList,
      // legend: {
      //   orient: 'vertical',
      //   top:50,
      //   left:10,
      //   data:['空气质量优','空气质量良','空气质量轻度污染','空气质量中度污染'],
      //   textStyle:{
      //     color:'#07bbc3',
      //   }
      // },
      series: [
        {
          name:'南海区空气质量',
          type:'pie',
          center:['40%','40%'],
          radius: ['25%', '45%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:aqiData
        }
      ]
    };
    echarts.init(this.echart1.nativeElement).setOption(option);

  }

  render(data){
    let date=[];
    let aqi=[];
    data.forEach(d=>{
      date.push(d.date);
      aqi.push(d.aqi);
    })

   let option = {
      tooltip: {
        trigger: 'item'
      },
      dataZoom: [
        { // 这个dataZoom组件，默认控制x轴。
          type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          start: 10, // 左边在 10% 的位置。
          end: 80, // 右边在 60% 的位置。
          dataBackground:{
            lineStyle:{
              color:'red'
            }
          }
        },
        { // 这个dataZoom组件，也控制x轴。
          show:true,
          type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
          start: 10, // 左边在 10% 的位置。
          end: 80, // 右边在 60% 的位置。

        }],
      legend: {
        data: ['Time', 'speed(m/min)']
      },
      xAxis: {
        type: 'category',
        data: date,
        splitArea: {
          show: false
        },
        axisLine: {
          show: true
        },
        axisLabel: {
          inside: false,
          textStyle: {
            color: "#fff",
            fontSize: 10
          },
        }
      },
      yAxis: [{
        type: 'value',
        name: '空气质量',
        min: 0,
        max: 200,
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
            fontSize: 10
          },
        },
        splitLine: {
          show: true,
          lineStyle:{
            type:'dashed'
          }
        },
      }],
      series: [{
        name: '空气质量',
        type: 'bar',
        // yAxisIndex: 1,
        data: aqi,
        itemStyle: {
          normal: {
            color: function(params) {
              // build a color map as your need.
              var colorList = [
                '#9BC53D','#FDE74C','#FA7921','#E55934'
              ];
              if(params.data<=50){
                return colorList[0];
              }
              else if(params.data<=100){
                return colorList[1];
              }
              else if(params.data<=150){
                return colorList[2];
              }
              else if(params.data<=200){
                return colorList[3];
              }
              else
                return colorList[4];
              // return colorList[params.dataIndex]
            }
          }
        },
      }]
    };
    echarts.init(this.echart.nativeElement).setOption(option);
  }

}
