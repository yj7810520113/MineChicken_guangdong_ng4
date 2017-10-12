import {Component, OnInit, ViewChild} from '@angular/core';
import {EatFileReaderService} from "../eat-file-reader.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-eat-place-type-compare',
  templateUrl: './eat-place-type-compare.component.html',
  styleUrls: ['./eat-place-type-compare.component.css']
})
export class EatPlaceTypeCompareComponent implements OnInit {
  @ViewChild('echart1') echart1;
  @ViewChild('echart2') echart2;

  constructor(private eatFileReaderService:EatFileReaderService) { }

  ngOnInit() {
    Observable.forkJoin(
      this.eatFileReaderService.getEatPlaceMapData1(),
      this.eatFileReaderService.getEatPlaceMapData2014()
    )
  }

}
