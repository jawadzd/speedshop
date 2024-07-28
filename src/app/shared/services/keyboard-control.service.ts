import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeyboardControlService {
  private keydown$ = fromEvent<KeyboardEvent>(window, 'keydown');
  private arrowKeySubject = new Subject<string>();
  private enterKeySubject = new Subject<void>();

  constructor() {
    this.keydown$
      .pipe(filter(event => event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Enter'))
      .subscribe(event => {
        if (event.key === 'Enter') {
          this.enterKeySubject.next();
        } else {
          this.arrowKeySubject.next(event.key);
        }
      });
  }

  get arrowKey$() {
    return this.arrowKeySubject.asObservable();
  }

  get enterKey$() {
    return this.enterKeySubject.asObservable();
  }
}
