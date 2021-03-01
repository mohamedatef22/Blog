const express = require("express");
const user = require("./routes/users");
const confirmation = require("./routes/confirmation");
const post = require("./routes/posts");
const app = express();

require("./startup/db")();

app.use(express.json());
app.use("/api/users", user);
app.use("/api/confirm", confirmation);
app.use("/api/posts", post);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connected to port: ${port}`));
