import { Component, OnInit } from '@angular/core';
import { Rider } from '../models/rider';
import { RaceResultService } from '../services/race-result.service';

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.component.html',
  styleUrls: ['./race-result.component.css']
})
export class RaceResultComponent implements OnInit {
	private results: Rider[];

  constructor(private readonly raceResultService: RaceResultService) { }

  ngOnInit() {
  	this.raceResultService.results.subscribe(value => this.results = value);
  }

}
