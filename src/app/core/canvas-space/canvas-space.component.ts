import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DragToSelectModule } from 'ngx-drag-to-select';

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
  selected!: any[];
  selectedCards!:ICard[];
  documents: any[] = [];


  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.zoomForm = this.fb.group({
      zoom: ['']
    });
    for (let id = 0; id < 12; id++) {
      this.documents.push({
        id,
        name: `Document ${id}`,
      });
    }


    this.zoomForm.valueChanges.subscribe(x => {
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

  logData(event:any[]):void{
    console.log(event);
    console.log(this.selectedCards);
  }

}
