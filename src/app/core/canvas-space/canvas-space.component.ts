import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { logger } from 'codelyzer/util/logger';

@Component({
  selector: 'app-canvas-space',
  templateUrl: './canvas-space.component.html',
  styleUrls: ['./canvas-space.component.scss']
})
export class CanvasSpaceComponent implements OnInit {
  public cards!: ICard[];
  cellSize = 5;
  cardUnderAction!: ICard;
  zoomForm!: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.zoomForm = this.fb.group({
      zoom: ['']
    });

    this.zoomForm.valueChanges.subscribe(x => {
      console.log(x);
      this.dataService.updateCellSize(Number(x.zoom));
    });
    this.dataService.cards().subscribe((cards: ICard[]) => {
      this.cards = cards;
    });

    this.dataService.cellSize().subscribe((value: number) => {
      this.cellSize = value;
    });
  }

  selectCard(card: ICard): void {
    this.cardUnderAction = card;
  }

}
