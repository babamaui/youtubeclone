import express from "express";

// initialize
const app = express();
const port = 3000;

// create route path, http get endpoint
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// launch via npm run start
app.listen(port, () => {
    console.log(
        `Video processing service listening at http://localhost:${port}`
        );
});

