import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cards } from './cards';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cards$: BehaviorSubject<ICard[]> = new BehaviorSubject<ICard[]>(cards);

  constructor() { }

  public cards(): Observable<ICard[]> {
    return this.cards$.asObservable();
  }
}
