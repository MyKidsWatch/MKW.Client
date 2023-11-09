import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {

  private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setLoadingBar(value: boolean = false): void {
    console.log("entrei aqui - " + value)
    this.subject.next(value);
  }

  getLoadingBar(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
