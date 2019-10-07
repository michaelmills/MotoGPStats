import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RaceResultComponent } from '../race-result/race-result.component';
import { RaceResultService } from '../services/race-result.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	@ViewChild('raceResults')
	raceResultsComponent: RaceResultComponent;

	title: string;

	yearFilterLabel = "Year";
	yearOptions: any[] = [];

	locationFilterLabel = "Location";
	locations = new Subject<any[]>();

	private yearRange = [2018, 2002];
	private selectedYear;
	private selectedCircuit;

	constructor(private readonly raceResultService: RaceResultService) {
	}

	ngOnInit() {
		for (let year = this.yearRange[0]; year >= this.yearRange[1]; year--) {
			this.yearOptions.push({name: year});
		}

		this.filterYear(this.yearOptions[0]);

		this.locations.subscribe(circuits => {
			this.filterLocation(circuits[0]);
		});
	}

	filterYear(selected: any) {
		this.selectedYear = selected['name'];
		this.raceResultService.getCircuits(selected['name'])
				.pipe(filter(Boolean))
				.subscribe(circuits => this.locations.next(circuits));
	}

	filterLocation(selected: string) {
		this.selectedCircuit = selected['id'];
		this.title = this.selectedYear + ' ' + selected['name'];
		this.raceResultsComponent.retrieveResults(this.selectedYear, this.selectedCircuit)
	}
}
