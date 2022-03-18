import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasSpaceComponent } from './canvas-space/canvas-space.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    CanvasSpaceComponent,
    CardComponent
  ],
  exports: [
    CanvasSpaceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
