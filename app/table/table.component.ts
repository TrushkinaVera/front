import { Component, OnInit } from '@angular/core';
import {Point} from '../model/model.point';
import {PointService} from '../servises/point.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [PointService]
})
export class TableComponent implements OnInit {
  public points: Point[];

  constructor(private service: PointService) { }

  ngOnInit() {
    this.service.getPoints().subscribe(data => this.points = data as Point[]);
  }
}
