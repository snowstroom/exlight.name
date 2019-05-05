export class ExError extends Error {
    toJSON() {
        return this.message;
    }
}
