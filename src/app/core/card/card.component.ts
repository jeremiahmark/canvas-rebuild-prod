import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() public card!: ICard;
  @Input() public container!: HTMLDivElement;
  @ViewChild('box') public box!: ElementRef;
  public mouse!: {x: number, y: number};
  public status: Status = Status.OFF;
  private mouseClick!: {x: number, y: number, left: number, top: number};
  private boxPosition!: { left: number, top: number };
  private containerPos!: { left: number, top: number, right: number, bottom: number };

  public ngOnInit(): void {}

  public ngAfterViewInit(): void{
    this.loadBox();
    this.loadContainer();
  }

  @HostListener('window:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent): void{
    this.mouse = { x: event.clientX, y: event.clientY };

    if (this.status === Status.RESIZE) {
      this.resize();
    }
    else if (this.status === Status.MOVE) {
      this.move();
    }
  }

  private loadBox(): void{
    const {left, top} = this.box.nativeElement.getBoundingClientRect();
    this.boxPosition = {left, top};
    console.log('Box position', this.boxPosition);
  }

  private loadContainer(): void {
    // const { left, top } = this.container.nativeElement.getBoundingClientRect();
    console.log(this.container);
    const top = this.container.offsetTop;
    const left = this.container.offsetLeft;
    const right = left + this.container.clientWidth;
    const bottom = top + this.container.clientHeight;
    this.containerPos = { left, top, right, bottom };
    console.log(this.containerPos);
  }

  public setStatus(event: MouseEvent, status: number): void{
    if (status === 1) {
      event.stopPropagation();
    }
    else if (status === 2) {
      this.mouseClick = {
        x: event.clientX, y: event.clientY, left: this.card.left, top: this.card.top
      };
    }
    else {
      this.loadBox();
    }
    this.status = status;
  }

  private resize(): void{
    if (this.resizeCondMeet()){
      this.card.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 0;
      this.card.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
    }
  }

  private resizeCondMeet(): boolean{
    return (this.mouse.x < this.containerPos.right && this.mouse.y < this.containerPos.bottom);
  }

  private move(): void{
    if (this.moveCondMeet()){
      this.card.left = this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
      this.card.top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);
      // console.log(this.left , this.top);
    }
  }

  private moveCondMeet(): boolean{
    const offsetLeft = this.mouseClick.x - this.boxPosition.left;
    const offsetRight = this.card.width - offsetLeft;
    const offsetTop = this.mouseClick.y - this.boxPosition.top;
    const offsetBottom = this.card.height - offsetTop;
    return (
      this.mouse.x > this.containerPos.left + offsetLeft &&
      this.mouse.x < this.containerPos.right - offsetRight &&
      this.mouse.y > this.containerPos.top + offsetTop &&
      this.mouse.y < this.containerPos.bottom - offsetBottom
    );
  }

}
