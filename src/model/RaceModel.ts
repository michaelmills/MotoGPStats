export class RaceModel {
    private name: string;
    private location: string;

    constructor(builder: RaceModelBuilder) {
        this.name = builder.Name;
        this.location = builder.Location;
    }

    get Name() {
        return this.name;
    }

    get Location() {
        return this.location
    }

}

export class RaceModelBuilder {
    private name: string;
    private location: string;

    set Name(name: string) {
        this.name = name;
    }

    get Name() {
        return name;
    }

    set Location(location: string) {
        this.location = location;
    }

    get Location() {
        return this.location;
    }

    build(): RaceModel {
        return new RaceModel(this);
    }
}
