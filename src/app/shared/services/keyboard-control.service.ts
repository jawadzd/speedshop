import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, share } from 'rxjs/operators';
//this is the service that will be used to control the keyboard events
@Injectable({
  providedIn: 'root',
})
export class KeyboardControlService {
  private arrowKeySubject = new Subject<string>();
  private enterKeySubject = new Subject<void>();
  private enabled = false;

  arrowKey$: Observable<string> = this.arrowKeySubject.asObservable(); //observable that will be used to listen to the arrow key events
  enterKey$: Observable<void> = this.enterKeySubject.asObservable(); //observable that will be used to listen to the enter key events

  constructor() {
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter(() => this.enabled),
        share()
      )
      .subscribe((event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          //if the arrow key is pressed
          this.arrowKeySubject.next(event.key);
        } else if (event.key === 'Enter') {
          this.enterKeySubject.next();
        }
      });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled; //this will enable or disable the keyboard events
  }

  isEnabled(): boolean {
    return this.enabled; //this will return the status of the keyboard events
  }
}
