const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connect");
const weatherRoutes = require("./Routes/weatherRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api", weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

require("./scheduler"); // Start scheduler
