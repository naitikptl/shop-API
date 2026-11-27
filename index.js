const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const corsOptions = {
  origin: true, // This allows all origins - use only for development
  optionsSuccessStatus: 200,
};
// user routes

app.use(express.json());

const userRoute = require("./routes/userRoutes");
app.use(cors(corsOptions));
app.use("/api", userRoute);
app.use("/api/profile", userRoute);

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`server start on ${port}`);
});
