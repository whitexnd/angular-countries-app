import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription, tap } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  @Input()
  placeholder: string = '';
  @Input()
  initialValue: string = '';

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Output()
  onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();


  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer.pipe(debounceTime(300)).subscribe(value => this.onDebounce.emit(value))
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe;
  }


  emitValue(value: string){
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm);
  }
}
