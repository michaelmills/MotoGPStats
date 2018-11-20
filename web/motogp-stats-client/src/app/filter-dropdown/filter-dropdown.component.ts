import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css']
})
export class FilterDropdownComponent implements OnInit {
	@Input()
	label: string;

	@Input()
	items: string[];

  constructor() { }

  ngOnInit() {
  }

}
