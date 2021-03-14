const express = require("express");
const user = require("./routes/users");
const confirmation = require("./routes/confirmation");
const post = require("./routes/posts");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

require("./startup/db")();

app.use(express.json());
app.use(cors());
app.use("/api/users", user);
app.use("/api/confirm", confirmation);
app.use("/api/posts", post);
app.use(helmet());
app.use(compression());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connected to port: ${port}`));
