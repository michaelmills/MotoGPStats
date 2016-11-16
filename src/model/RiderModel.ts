export class RiderModel {
    private name: string;

    constructor(builder: RiderModelBuilder) {
        this.name = builder.Name;
    }

    get Name() {
        return this.name;
    }
}

export class RiderModelBuilder {
    private name: string;
    private ranking: string;

    set Name(name: string) {
        this.name = name;
    }

    get Name() {
        return name;
    }

    build(): RiderModel {
        return new RiderModel(this);
    }
}
