import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeyboardControlService {
  private arrowKeySubject = new Subject<string>();
  private enterKeySubject = new Subject<void>();
  private enabled = false;

  arrowKey$: Observable<string> = this.arrowKeySubject.asObservable();
  enterKey$: Observable<void> = this.enterKeySubject.asObservable();

  constructor() {
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter(() => this.enabled),
        share()
      )
      .subscribe(event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          this.arrowKeySubject.next(event.key);
        } else if (event.key === 'Enter') {
          this.enterKeySubject.next();
        }
      });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}
