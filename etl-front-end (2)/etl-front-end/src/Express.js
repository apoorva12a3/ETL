const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for your frontend's origin (replace with your frontend URL)
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

// Sample authentication endpoint
app.post("/authenticate", (req, res) => {
  const { username, password } = req.body;

  // Replace this with your actual authentication logic
  if (username === "your_username" && password === "your_password") {
    // Generate a JWT token and send it back
    const token = "your_generated_token";
    res.json({ token });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

// Sample file upload endpoint
app.post("/api/csv/upload", (req, res) => {
  // Handle file upload logic here

  // Respond with a success message
  res.json({ message: "File uploaded successfully" });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
