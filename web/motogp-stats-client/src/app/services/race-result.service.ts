import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Rider } from '../models/rider';
import { RaceResult, RaceTrack, RaceTrackEntry } from './race-track';

@Injectable({
	providedIn: 'root'
})
export class RaceResultService {

	raceInfo = new Subject<any>();
	results = new Subject<Rider[]>();

	constructor(private http: HttpClient) {
	}

	public getLocations(): Observable<string[]> {
		return this.http.get('assets/races.json').pipe(
				map((value: RaceTrack) => value.tracks.map(detail => detail.name)));
	}

	public filter(location: string): void {
		this.http.get<RaceTrack>('assets/races.json')
				.pipe(
						map((value: RaceTrack) => value.tracks.find((track: RaceTrackEntry) => track.name === location).filename),
						switchMap(filename => this.getResults(filename)))
				.subscribe(value => {
					this.raceInfo.next({ year: '2016', location: location });
					this.results.next(value);
				});

	}

	private getResults(filename: string) {
		return this.http.get(filename)
				.pipe(
						map((value: RaceResult) => value.standing.map(entry => {
							let rider = new Rider();
							rider.position = Number(entry.position) === 0 ? '-' : Number(entry.position);
							rider.name = entry.driver_label;
							rider.time = entry.time;
							rider.team = entry.driver_carbike;
							return rider;
						})));
	}

}
