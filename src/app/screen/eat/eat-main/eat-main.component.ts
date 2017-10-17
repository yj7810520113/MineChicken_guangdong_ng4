import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {EatFileReaderService} from "../eat-file-reader.service";

@Component({
  selector: 'app-eat-main',
  templateUrl: './eat-main.component.html',
  styleUrls: ['./eat-main.component.css']
})
export class EatMainComponent implements OnInit {
  dataSource=['餐饮服务单位','食品流通企业'];
  selectedValue='餐饮服务单位';
  private selectedValueSubject=new Subject();

  hexNum=['小','中','大'];
  selectedHexNum='中';
  private selectedHexNumSubject=new Subject();


  eatType=['全部','小型餐馆','中型餐馆','大型餐馆','食堂','快餐店','小吃店'];
  selectedEatType='全部';
  isEatType=true;
  private selectedEatTypeSubject=new Subject();


  constructor(private eatFileReaderService:EatFileReaderService) { }

  ngOnInit() {
  }
  change1(){
    // console.log(this.selectedValue)
    if(this.selectedValue=='餐饮服务单位'){
      this.isEatType=true;
    }
    else
      this.isEatType=false;
    this.eatFileReaderService.setSelectFormSubject([this.selectedValue,this.selectedHexNum,this.isEatType?this.selectedEatType:'']);
  }

}
