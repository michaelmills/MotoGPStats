import { Component, Input, OnInit } from '@angular/core';
import { RaceResultService } from '../services/race-result.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
	@Input()
	label: string;

  constructor() { }

  ngOnInit() {
  }

}
