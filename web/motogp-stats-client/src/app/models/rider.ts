export class Rider {
	private _position: number | string;
	private _name: string;
	private _time: string;
	private _team: string;

	set position(position: number | string) {
		this._position = position;
	}

	get position() {
		return this._position;
	}

	set name(name: string) {
		this._name = name;
	}

	get name() {
		return this._name;
	}

	set time(time: string) {
		this._time = time;
	}

	get time() {
		return this._time;
	}

	set team(team: string) {
		this._team = team;
	}

	get team() {
		return this._team;
	}
}
