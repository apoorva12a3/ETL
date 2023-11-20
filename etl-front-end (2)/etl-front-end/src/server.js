const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

// Enable CORS for your frontend's origin
app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

// Define your API routes and server logic here
app.post("/api/csv/upload", (req, res) => {
  // Handle file upload logic here

  // Respond with success or failure
  res.json({ message: "File uploaded successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
