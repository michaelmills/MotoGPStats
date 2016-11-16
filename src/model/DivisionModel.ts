export class DivisionModel {
    private name: string;
    private ranking: string;

    constructor(builder: RaceModelBuilder) {
        this.name = builder.Name;
        this.ranking = builder.Ranking;
    }

    get Name() {
        return this.name;
    }

    get Ranking() {
        return this.ranking
    }

}

export class RaceModelBuilder {
    private name: string;
    private ranking: string;

    set Name(name: string) {
        this.name = name;
    }

    get Name() {
        return name;
    }

    set Ranking(ranking: string) {
        this.ranking = ranking;
    }

    get Ranking() {
        return this.ranking;
    }

    build(): DivisionModel {
        return new DivisionModel(this);
    }
}
