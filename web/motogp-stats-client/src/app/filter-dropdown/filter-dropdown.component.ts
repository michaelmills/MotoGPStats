import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css']
})
export class FilterDropdownComponent implements OnInit {
	@Input()
	label: string;

	@Input()
	content: string[];

	@Output()
	selected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onChange(selectedValue: string) {
  	this.selected.emit(selectedValue);
  }
}
