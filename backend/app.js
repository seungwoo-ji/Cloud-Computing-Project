const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const db = require("./db");
const { uploadToS3 } = require("./s3");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, JPG, PNG, and WEBP are allowed."
        )
      );
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Routes
app.post("/api/pets", upload.single("image"), async (req, res) => {
  try {
    const { name, age, breed } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    if (!name || !age || !breed) {
      return res
        .status(400)
        .json({ error: "Name, age, and breed are required" });
    }

    // Upload image to S3
    const imageUrl = await uploadToS3(req.file);

    // Store pet information in database
    const sql = `
            INSERT INTO pets (name, age, breed, imageUrl)
            VALUES (?, ?, ?, ?)
        `;

    db.run(sql, [name, age, breed, imageUrl], function (err) {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ error: "Failed to save pet information" });
      }

      res.status(201).json({
        id: this.lastID,
        name,
        age,
        breed,
        imageUrl,
      });
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/pets", (req, res) => {
  const sql = "SELECT * FROM pets ORDER BY createdAt DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to fetch pets" });
    }
    res.json(rows);
  });
});

// Serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File size too large. Maximum size is 5MB." });
    }
    return res.status(400).json({ error: err.message });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
