const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const dbConfig = require("./config/dbConfig");

app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute");

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

const port = process.env.PORT || 5000;
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

console.log("Mongo URL:", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB error:", err));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
