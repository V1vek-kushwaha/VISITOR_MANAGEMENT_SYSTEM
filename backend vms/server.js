const express = require("express");
const cors = require("cors");
// ...some code...
const app = express();

const db = require("./models"); // ✅ use 'db' not 'sequelize'
const dotenv = require("dotenv");
const morgan = require("morgan")
dotenv.config();

const port = process.env.port || 5000;

// Sync Sequelize
db.sequelize
  .sync({
    alter: true,
  })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err);
  });

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// middleware
app.use(morgan("dev"))



// Routes
const authRoutes = require("./routers");
app.use("/api", authRoutes);  // Now your endpoints are: /api/auth/register, /api/auth/login


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
