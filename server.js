
const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, 'build')));

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

let port = 8080
app.listen(port, () => {
    console.log("server started on port: " + port);
});


