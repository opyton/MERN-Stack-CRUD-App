const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const uri = "mongodb://localhost:27017/todo";
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("connected to: " + uri);
    else console.log(err);
  }
);

const TodoController = require("./controllers/todoController");
app.use("/", TodoController);

const PORT = 4000;
app.listen(PORT, () => console.log("connected to port: " + PORT));
