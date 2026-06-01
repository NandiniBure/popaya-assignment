const express = require("express");
const cors = require("cors");

const noteRoutes = require("./routes/notes.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
