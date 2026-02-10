const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const questionRoutes = require("./routes/questionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://theorypro.onrender.com/",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin))
        return callback(new Error(`CORS blocked: ${origin}`), false);
      return callback(null, true);
    },
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api", questionRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
