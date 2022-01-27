const express = require("express");
const connectDB = require("./config/db");

const app = express();
//!IMPORTANT -- body parser
app.use(express.json());

const PORT = process.env.PORT || 5000;

//connect db
connectDB();

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/user"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server up and running at port ${PORT}`);
});
