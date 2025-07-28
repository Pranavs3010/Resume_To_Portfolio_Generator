// server/index.js

const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5001; // Port for the backend server

// Use CORS to allow communication with the frontend
app.use(cors());
app.use(express.json());

// Set up storage for uploaded files using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Define the API endpoint for file uploads
app.post("/api/upload", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const filePath = req.file.path;

  // Spawn a Python process to run the resume parsing script
  const pythonProcess = spawn("python", ["-u", "resume_parser.py", filePath]);

  let dataString = "";
  let errorString = "";

  pythonProcess.stdout.on("data", (data) => {
    dataString += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    errorString += data.toString();
  });

  pythonProcess.on("close", (code) => {
    // Clean up the uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete temporary file:", err);
    });

    if (code !== 0) {
      console.error("Python script error:", errorString);
      return res
        .status(500)
        .json({ error: "Failed to parse resume.", details: errorString });
    }

    try {
      const parsedData = JSON.parse(dataString);
      res.json(parsedData);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      res
        .status(500)
        .json({
          error: "Failed to parse JSON output from script.",
          details: dataString,
        });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
