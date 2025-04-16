const express = require("express");
const app = express();
const sequelize = require("./models");
const dotenv = require("dotenv");
dotenv.config();

//define port
const port = process.env.port || 5000;

sequelize
  .sync()
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

// CORS setup
app.use(
  cors({
    origin: "*", // Allow requests from any origin (for testing purposes)
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    version: "1.0.0",
    api: "VMS API Services",
    health: "Running ✅",
  });
});

app.listen(port, async () => {
  try {
    // if(process.env.)
    // get secretsString:
    // const secretsString = await retrieveSecrets();
    // console.log("env are:", secretsString);
    // //write to .env file at root level of project:
    // await fs.writeFile(".env", secretsString);

    dotenv.config();

    console.log(`Example app listening at http://localhost:${port}`);
  } catch (error) {
    //log the error and crash the app
    console.log("Error in setting environment variables", error);
    process.exit(-1);
  }
});
