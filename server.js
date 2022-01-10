const express = require("express");
const connectDB = require("./config/db");

const app = express();
//!IMPORTANT -- body parser
app.use(express.json());

const PORT = process.env.PORT || 5000;

//connect db
connectDB();

app.get("/", (req, res) => {
    res.send("API RUNNING ;)");
});

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/user"));

app.listen(PORT, () => {
    console.log(`Server up and running at port ${PORT}`);
});
