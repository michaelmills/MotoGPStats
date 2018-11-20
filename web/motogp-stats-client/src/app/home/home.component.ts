import { Component, OnInit } from '@angular/core';
import { RaceResultService } from '../services/race-result.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	title: string;
	private filters: any[] = [];
	private yearOptions = ["2016", "2015", "2014"];

	constructor(private readonly raceResultService: RaceResultService) {
	}

	ngOnInit() {
		this.raceResultService.getLocations().subscribe(locationOptions =>
				this.filters.push({
					label: "Year",
					content: this.yearOptions
				}, {
					label: "Location",
					content: locationOptions
				})
		);

		this.raceResultService.raceInfo.subscribe(info => {
			this.title = info.year + ' ' + info.location;
		})
	}

}
