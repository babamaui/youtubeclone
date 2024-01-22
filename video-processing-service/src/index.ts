import express from "express";
import ffmpeg from "fluent-ffmpeg"; // wrapper around ffmpeg cli tool -> will not work if your machine does not have the ffmpeg cil !

// initialize
const app = express();
// let express use json for requests
app.use(express.json());

// http get request endpoint
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.post("/process-video", (req, res) => {
    // Get path of the input video file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    // Error handling for file paths
    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad Request: Missing file path.")
    }

    ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-1:360") // Convert to 360p
        .on("end", () => {
            res.status(200).send("Video processing started.") // Complete
        })
        .on("error", (err) => {
            console.log(`An error occured: ${err.message}`);
            res.status(500).send(`Internal Server Error: ${err.message}`); // 500 level, server error
        })
        .save(outputFilePath);
});

// Standard way of providing port at runtime. use 3000 if not defined (local)
const port = process.env.PORT || 3000;

// launch via npm run start
app.listen(port, () => {
    console.log(
        `Video processing service listening at http://localhost:${port}`
        );
});

