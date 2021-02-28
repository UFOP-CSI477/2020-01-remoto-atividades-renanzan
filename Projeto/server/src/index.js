const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

const app = express();

const port = process.env.PORT || 5000;

//## Middlewares
app.use(express.json());
app.use(cors());

//## Database Connection
mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(() => console.log("DB Connected!"))
.catch(err => console.log(err));

//## Server Connection
app.listen(port, () => console.log(`App running succesfully in the port ${port}`));