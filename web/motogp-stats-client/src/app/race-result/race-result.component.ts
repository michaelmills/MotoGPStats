import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { Rider } from '../models/rider';
import { RaceResultService } from '../services/race-result.service';

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.component.html',
  styleUrls: ['./race-result.component.css']
})
export class RaceResultComponent implements OnInit {
	results: Observable<Rider[]>;

  constructor(private readonly raceResultService: RaceResultService) { }

  ngOnInit() {
  	this.results = this.raceResultService.results;
  }

}