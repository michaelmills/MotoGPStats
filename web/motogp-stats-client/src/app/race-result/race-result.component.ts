import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/index';
import { Rider } from '../models/rider';
import { RaceResultService } from '../services/race-result.service';

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.component.html',
  styleUrls: ['./race-result.component.css']
})
export class RaceResultComponent implements OnInit {
	results: Observable<any[]>;

  constructor(private readonly raceResultService: RaceResultService) { }

  ngOnInit() {
  	// this.results = this.raceResultService.results;
  }

  retrieveResults(year: number, circuitKey: number) {
	  this.results = this.raceResultService.getResults(year, circuitKey);
  }
}
