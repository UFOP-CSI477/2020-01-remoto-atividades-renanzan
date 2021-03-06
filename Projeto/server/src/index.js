const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");
require("./global");

const app = express();

const port = process.env.PORT || 5000;

//## Middlewares
app.use(express.json());
app.use(cors());

//## Controllers
require("./database/controllers/authController")(app);
require("./database/controllers/worldController")(app);
require("./database/controllers/villageController")(app);
require("./database/controllers/formController")(app);

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