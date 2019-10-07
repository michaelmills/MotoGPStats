import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css']
})
export class FilterDropdownComponent implements OnInit, OnChanges {
	@Input()
	label: string;

	@Input()
	content: any[];

	@Output()
	selected = new EventEmitter<any>();

	initial: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  	if (changes['content'].currentValue) {
  	  this.initial = changes['content'].currentValue[0];
	  }
  }

	onChange(selectedValue: any) {
  	this.selected.emit(selectedValue);
  }
}
