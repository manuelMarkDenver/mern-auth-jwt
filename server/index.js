require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require('./db');
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});