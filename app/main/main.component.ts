import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PointService} from '../servises/point.service';
import {Point} from '../model/model.point';
import {UserService} from '../servises/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [PointService, UserService]
})
export class MainComponent implements OnInit {

  @ViewChild('canvas', {static: true})
  canvas: ElementRef;
  errorMessage: string;
  point: Point = new Point(0, 0, 1, true);
  constructor(public service: PointService, public userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.drawGraphic(1);
  }

  setX(value) {
    if (!/^-?\d+([.,]\d+)?$/.test(String(value))) {return; }
    this.point.x = Number(String(value).replace(',', '.'));
    if (this.point.x === -5 && /^-?[0-4]([.,]\d+)?$/.test(String(value))) { this.point.x = -4.999; }
    if (this.point.x === 3 && /^-?[0-2]([.,]\d+)?$/.test(String(value))) { this.point.x = 2.999; }
  }

  setY(value) {
    if (!/^-?\d+([.,]\d+)?$/.test(String(value))) {return; }
    this.point.y = Number(String(value).replace(',', '.'));
    if (this.point.y === -3 && /^-?[0-2]([.,]\d+)?$/.test(String(value))) { this.point.y = -2.999; }
    if (this.point.y === 3 && /^-?[0-2]([.,]\d+)?$/.test(String(value))) { this.point.y = 2.999; }
  }
  setR(value) {
    if (!/^\d+([.,]\d+)?$/.test(String(value))) {this.error('Радиус некорректен'); return; }
    if (Number(String(value)) < 0 || Number(String(value)) > 2.999) {this.error('Радиус некорректен'); return; }
    this.point.r = Number(String(value).replace(',', '.'));
    if (this.point.r === 3 && /^-?[0-2]([.,]\d+)?$/.test(String(value))) { this.point.r = 2.999; }
  }

  addPoint(): boolean {
    let valid: boolean;
    valid = true;
    this.point.x = Number(String(this.point.x).replace(',', '.'));
    if (String(this.point.x) === '' || !/^-?\d+([.,]\d+)?$/.test(String(this.point.x)) || !(-5 < this.point.x && this.point.x < 3)) {
      this.error('Неподходящее значение X');
      valid = false;
    }
    this.point.y = Number(String(this.point.y).replace(',', '.'));
    if (String(this.point.y) === '' || !/^-?\d+([.,]\d+)?$/.test(String(this.point.y)) || !(-3 < this.point.y && this.point.y < 3)) {
      this.error('Неподходящее значение Y');
      valid = false;
    }
    this.point.r = Number(String(this.point.r).replace(',', '.'));
    if (String(this.point.r) === '' || !/^-?\d+([.,]\d+)?$/.test(String(this.point.r)) || !(0 <= this.point.r && this.point.r < 3)) {
      this.error('Неподходящее значение R');
      valid = false;
    }
    if (valid) {
    this.service.addPoint(this.point).then(data => this.drawPoint(data as Point));
  }
    return valid;
  }

  getPointsRecalculated(r) {
     this.service.getPointsRecalculated(r).subscribe(data => (data as Point[]).forEach(p => this.drawPoint(p)),
         error => { localStorage.removeItem('currentUser');
                    this.router.navigate(['/login']); });
  }

  addPointFromCanvas() {
    let br: ClientRect;
    br = this.canvas.nativeElement.getBoundingClientRect();
    let left: number;
    left = br.left;
    let top: number;
    top = br.top;

    let event: MouseEvent;
    event = window.event as MouseEvent;
    let x: number;
    x = event.clientX - left + 1;
    let y: number;
    y = event.clientY - top + 1;

    let xCalculated: number;
    xCalculated = (x - 150) / 130 * 5;
    let yCalculated: number;
    yCalculated = (-y + 150) / 130 * 5;
    if (this.point.r < 0 ) {this.error('Радиус некорректен');  return; }
    this.service.addPoint(new Point(xCalculated, yCalculated, this.point.r, false)).then(data => this.drawPoint(data as Point));
  }

  drawPoint(point: Point) {
    let x: number;
    x = point.x;

    let y: number;
    y = point.y;

    let r: number;
    r = point.r;

    let isInArea: boolean;
    isInArea = point.isInArea;

    let context: CanvasRenderingContext2D;
    context = this.canvas.nativeElement.getContext('2d');

    context.beginPath();
    context.arc(Math.round(150 + ((x / 5) * 130)), Math.round(150 - ((y / 5) * 130)), 1.5, 0, 2 * Math.PI);
    context.closePath();
    let color = 'red';

    if (isInArea) {
      color = 'white';
    }

    context.fillStyle = color;
    context.fill();

  }



  drawGraphic(r) {
    if (r < 0 || r > 2.999) {return; }
    let context: CanvasRenderingContext2D;
    context = this.canvas.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    // rectangle
    context.beginPath();
    context.rect(150 - r * 26, 150 - r * 13, 130 * (r / 5), (r) * 13 );
    context.closePath();
    context.strokeStyle = '#265196';
    context.fillStyle = '#265196';
    context.fill();
    context.stroke();

    // sector
    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 130 * (r / 5), 0, Math.PI  * 3 / 2, true );
    context.closePath();
    context.strokeStyle = '#265196';
    context.fillStyle = '#265196';
    context.fill();
    context.stroke();

    // triangle
    context.beginPath();
    context.moveTo(150, 150);
    context.lineTo(150, 150 + (130 * (r / 5)));
    context.lineTo(150 - r * 26, 150);
    context.lineTo(150, 150);
    context.closePath();
    context.strokeStyle = '#265196';
    context.fillStyle = '#265196';
    context.fill();
    context.stroke();

    // axes
    context.beginPath();
    context.font = '10px Verdana';
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.moveTo(150, 0);
    context.lineTo(150, 300);
    context.moveTo(150, 0);
    context.lineTo(145, 15);
    context.moveTo(150, 0);
    context.lineTo(155, 15);
    context.fillText('Y', 160, 10);
    context.moveTo(0, 150);
    context.lineTo(300, 150);
    context.moveTo(300, 150);
    context.lineTo(285, 145);
    context.moveTo(300, 150);
    context.lineTo(285, 155);
    context.fillText('X', 290, 130);

    // Y parts
    context.moveTo(145, 20);
    context.lineTo(155, 20);
    context.fillText(' 5', 160, 20);
    context.moveTo(145, 46);
    context.lineTo(155, 46);
    context.fillText(' 4', 160, 46);
    context.moveTo(145, 72);
    context.lineTo(155, 72);
    context.fillText(' 3', 160, 72);
    context.moveTo(145, 98);
    context.lineTo(155, 98);
    context.fillText(' 2', 160, 98);
    context.moveTo(145, 124);
    context.lineTo(155, 124);
    context.fillText(' 1', 160, 124);

    context.moveTo(145, 176);
    context.lineTo(155, 176);
    context.fillText('-1', 160, 176);
    context.moveTo(145, 202);
    context.lineTo(155, 202);
    context.fillText('-2', 160, 202);
    context.moveTo(145, 228);
    context.lineTo(155, 228);
    context.fillText('-3', 160, 228);
    context.moveTo(145, 254);
    context.lineTo(155, 254);
    context.fillText('-4', 160, 254);
    context.moveTo(145, 280);
    context.lineTo(155, 280);
    context.fillText('-5', 160, 280);

    // X parts
    context.moveTo(20, 145);
    context.lineTo(20, 155);
    context.fillText('-5', 13, 140);
    context.moveTo(46, 145);
    context.lineTo(46, 155);
    context.fillText('-4', 39, 140);
    context.moveTo(72, 145);
    context.lineTo(72, 155);
    context.fillText('-3', 65, 140);
    context.moveTo(98, 145);
    context.lineTo(98, 155);
    context.fillText('-2', 91, 140);
    context.moveTo(124, 145);
    context.lineTo(124, 155);
    context.fillText('-1', 117, 140);

    context.moveTo(176, 145);
    context.lineTo(176, 155);
    context.fillText(' 1', 169, 140);
    context.moveTo(202, 145);
    context.lineTo(202, 155);
    context.fillText(' 2', 195, 140);
    context.moveTo(228, 145);
    context.lineTo(228, 155);
    context.fillText(' 3', 221, 140);
    context.moveTo(254, 145);
    context.lineTo(254, 155);
    context.fillText(' 4', 247, 140);
    context.moveTo(280, 145);
    context.lineTo(280, 155);
    context.fillText(' 5', 273, 140);

    context.closePath();
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.stroke();

    this.getPointsRecalculated(r);

  }

  private error(message: string) {
    this.errorMessage = message;
    setTimeout(() => {this.errorMessage = null; }, 3000);
  }

}
