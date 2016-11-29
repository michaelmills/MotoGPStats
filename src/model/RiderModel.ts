export class RiderModel {
    private position: number | string;
    private name: string;
    private time: string;
    private team: string;

    constructor(builder: RiderModelBuilder) {
        this.position = builder.Position;
        this.name = builder.Name;
        this.time = builder.Time;
        this.team = builder.Team;
    }

    get Position() {
        return this.position;
    }
    get Name() {
        return this.name;
    }
    get Time() {
        return this.time;
    }
    get Team() {
        return this.team;
    }
}

export class RiderModelBuilder {
    private position: number | string;
    private name: string;
    private time: string;
    private team: string;

    set Position(position: number | string) {
        this.position = position;
    }

    get Position() {
        return this.position;
    }

    set Name(name: string) {
        this.name = name;
    }

    get Name() {
        return this.name;
    }

    set Time(time: string) {
        this.time = time;
    }

    get Time() {
        return this.time;
    }

    set Team(team: string) {
        this.team = team;
    }

    get Team() {
        return this.team;
    }

    build(): RiderModel {
        return new RiderModel(this);
    }
}
