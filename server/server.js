const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./utils/db");
const dotenv = require("dotenv");
const router = require("./routes/route");
const { errorHandler, notFound } = require("./middleware/error.middleware");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("tiny"));

app.use("/api", router);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT} . Visit http://localhost:${PORT}`
        .green.bold
    );
  });
});
