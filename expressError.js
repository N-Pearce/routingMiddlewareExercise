class ExpressError extends Error {
    constructor(message, status){
        super();
        this.message = message
        this.status = status
        console.error(this.stack)
        console.log(message)
    }
}

module.exports = ExpressError