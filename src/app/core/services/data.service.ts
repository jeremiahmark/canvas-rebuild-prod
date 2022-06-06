import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { cards } from './cards';
import { defaultCellSize, gutter } from '../config';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cards$: BehaviorSubject<ICard[]> = new BehaviorSubject<ICard[]>(cards);
  private cellSize$: BehaviorSubject<number> = new BehaviorSubject<number>(defaultCellSize);
  private gutter$: BehaviorSubject<number> = new BehaviorSubject<number>(gutter);

  private mouseMove$: Observable<MouseEvent> = fromEvent<MouseEvent>(document, 'mousemove');
  private mouseUp$: Observable<MouseEvent> = fromEvent<MouseEvent>(document, 'mouseup');

  constructor() { }

  public cards(): Observable<ICard[]> {
    return this.cellSize$.pipe(
      switchMap((cellSize: number) => this.cards$.pipe(
        map((items: ICard[]) => {
          return items.map((card: ICard) => {
            return this.calculateCardNumeric(card, cellSize);
          });
        })
      ))
    );
  }

  // ------------------------


  public updateCellSize(value: number): void {
    this.cellSize$.next(value);
  }

  public updateCards(collection: ICard[]): void {
    this.cards$.next(collection);
  }

  public cellSize(): Observable<number> {
    return this.cellSize$.asObservable();
  }

  public gutter(): Observable<number> {
    return this.gutter$.asObservable();
  }

  public getMouseMove(): Observable<MouseEvent> {
    return this.mouseMove$;
  }

  public getMouseUp(): Observable<MouseEvent> {
    return this.mouseUp$;
  }

  private calculateCardNumeric(card: ICard, cellSize: number): ICard {
    return {
      width: card.width * cellSize,
      height: card.height * cellSize,
      top: card.top * cellSize,
      left: card.left * cellSize,
      id: card.id,
      img: card.img
    };
  }
}
