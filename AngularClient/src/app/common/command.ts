
export abstract class Command {

    abstract get title(): string;

    get isEnabled(): boolean { return true; }

    exec(): void {
        if (this.isEnabled) {
            this.execInner();
        }
    }

    protected abstract execInner(): void;
}
