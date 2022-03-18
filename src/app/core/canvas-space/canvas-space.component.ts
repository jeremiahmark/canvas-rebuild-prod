import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-canvas-space',
  templateUrl: './canvas-space.component.html',
  styleUrls: ['./canvas-space.component.scss']
})
export class CanvasSpaceComponent implements OnInit {
  public cards!: ICard[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.cards().subscribe((cards: ICard[]) => {
      this.cards = cards;
    });
  }

}
