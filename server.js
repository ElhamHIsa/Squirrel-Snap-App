// const express = require("express");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const { v2: cloudinary } = require("cloudinary");

// const app = express();
// app.use(express.json());

// mongoose.connect("mongodb+srv://sonyajay:<db_password>@cluster0.kvrxa.mongodb.net/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// cloudinary.config({
//   cloud_name: "your-cloud-name",
//   api_key: "your-api-key",
//   api_secret: "your-api-secret",
// });

// // Endpoint to upload a post
// app.post("/upload", (req, res) => {
//   // Logic to handle image uploads and store data in MongoDB
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

// Initialize express app
const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://sonyajay:<db_password>@cluster0.kvrxa.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dmubmefsx",
  api_key: "411825287312351",
  api_secret: "8pf-2g1TvLbaoDadeH_T7ApwrtE",
});

// Multer setup for file storage
const storage = multer.memoryStorage(); // Use memory storage to upload files
const upload = multer({ storage });

// Endpoint to upload a post
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(req.file.buffer, {
      resource_type: "image",
    });

    // Save relevant data to MongoDB (you can define your schema/model)
    // Here is an example model structure
    const post = new Post({
      imageUrl: result.secure_url,
      // Add more fields as needed
    });

    await post.save();

    res
      .status(201)
      .json({ message: "Upload successful", url: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Example MongoDB schema (define your own as needed)
const postSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  // Additional fields for your posts
});

const Post = mongoose.model("Post", postSchema);

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
