class FailsafeError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
class ExpressServerError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
export {FailsafeError, ExpressServerError, AuthError};
