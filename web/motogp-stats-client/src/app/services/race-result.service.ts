import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';
import { Rider } from '../models/rider';
import { RaceResult, Ranking, TrackMapping } from './race-track';

@Injectable({
	providedIn: 'root'
})
export class RaceResultService {

	raceInfo = new Subject<any>();
	results = new Subject<Rider[]>();

	raceResults = new Subject<any[]>();

	private trackMappings: TrackMapping[];
	private readonly racePath = 'assets/motogp/2016/LOCATION/race.json';

	constructor(private http: HttpClient) {
	}

	public getLocations(): Observable<string[]> {
		return this.http.get<TrackMapping[]>('assets/motogp/2016/index.json').pipe(
				tap((value: TrackMapping[]) => this.trackMappings = value),
				map((value: TrackMapping[]) => value.map(mapping => mapping.trackName)));
	}

	public filter(location: string): void {
		const trackId = this.trackMappings.find(value => value.trackName === location).trackId;

		this.http.get<Ranking[]>(this.racePath.replace('LOCATION', trackId))
				.pipe(
						map((value: Ranking[]) => value.map(rank => {
							let rider = new Rider();
							rider.position = rank.pos;
							rider.name = rank.rider;
							rider.time = rank['time/gap'];
							rider.team = rank.team;
							return rider;
						})))
				.subscribe(value => {
					this.raceInfo.next({year: '2016', location: location});
					this.results.next(value);
				});
		// this.http.get<RaceTrack>(this.racePath.replace('LOCATION', trackId))
		// 		.pipe(
		// 				map((value: Ranking) => value.tracks.find((track: RaceTrackEntry) => track.name === location).filename),
		// 				switchMap(filename => this.getResults(filename)))
		// 		.subscribe(value => {
		// 			this.raceInfo.next({year: '2016', location: location});
		// 			this.results.next(value);
		// 		});
	}

	public getCircuits(year: string | number): Observable<any[]> {
		const params = { 'year': year.toString() };
		return this.http.get<any[]>('motogpstats/race/circuits', { params: params });
	}

	public getResults(year: string | number, circuitKey: string | number) {
		const params = { 'year': year.toString(), 'circuitKey': circuitKey.toString() };
		return this.http.get<string[]>('motogpstats/race/results', { params: params });
	}

	private getResultsssss(filename: string) {
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
