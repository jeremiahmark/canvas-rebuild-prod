import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasSpaceComponent } from './canvas-space/canvas-space.component';
import { CardComponent } from './card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    CanvasSpaceComponent,
    CardComponent
  ],
  exports: [
    CanvasSpaceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule
  ]
})
export class CoreModule { }
