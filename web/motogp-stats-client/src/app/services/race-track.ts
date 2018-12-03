export interface RaceTrack {
	tracks: RaceTrackEntry[];
}

export interface RaceTrackEntry {
	name: string;
	filename: string;
}

export interface RaceResult {
	standing: RaceResultEntry[];
}

export interface RaceResultEntry {
	position: string;
	driver_label: string;
	time: string;
	driver_carbike: string;
}

export interface TrackMapping {
	trackId: string;
	trackName: string;
}

export interface Ranking {
	pos: string;
	rider: string;
	team: string;
	'time/gap': string;
}