import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { RaceResultService } from '../services/race-result.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	title: Observable<string>;
	yearFilterLabel = "Year";
	yearOptions = ["2016", "2015", "2014"];
	locationFilterLabel = "Location";
	locations: string[];

	constructor(private readonly raceResultService: RaceResultService) {
	}

	ngOnInit() {
		this.raceResultService.getLocations().subscribe(value => {
			this.locations = value;
			this.filterLocation(this.locations[0]);
		});

		this.title = this.raceResultService.raceInfo.pipe(
				map(info => info.year + ' ' + info.location));
	}

	filterYear(selected: string) {
	}

	filterLocation(selected: string) {
		this.raceResultService.filter(selected);
	}

}
