const express = require('express')
const ExpressError = require('./expressError')
const app = express()

app.use(express.json());
app.use('/', require('./routes/api/items'))

/// Error handlers
app.use((req, res, next) => {
    const notFoundError = new ExpressError("Page Not Found", 404)
    console.log(notFoundError.message)
    return next(notFoundError)
})

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message
    return res.status(status).json({
        error: { message, status }
    });
});

module.exports = app;