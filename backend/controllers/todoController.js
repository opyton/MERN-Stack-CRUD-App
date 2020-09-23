const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModels");

router.get("/", (req, res) => {
  const findDb = new Promise((resolve, reject) => {
    const db = Todo.find();
    if (db) resolve(db);
    else reject("error: db not found");
  });
  findDb.then((db) => res.json(db)).catch((msg) => res.status(404).json(msg));
});

router.get("/:id", (req, res) => {
  const idFindPromise = new Promise((resolve, reject) => {
    const doc = Todo.findById(req.params.id);
    if (doc) resolve(doc);
    else reject({ reason: "val does not exist" });
  });
  idFindPromise
    .then((doc) => res.json(doc))
    .catch((msg) => res.status(404).json(msg));
});

router.post("/", (req, res) => {
  const readyToPost = new Promise((resolve, reject) => {
    const body = req.body;
    const postData = new Todo({
      item: body.item,
    });
    if (postData) {
      resolve(postData);
    } else reject("no content in body");
  });

  readyToPost
    .then((postData) => {
      postData.save();
      res.json(postData);
    })
    .catch((msg) => res.status(404).json(msg));
});

router.delete("/:id", (req, res) => {
  const checkDelete = new Promise((resolve, reject) => {
    const deletedId = Todo.findByIdAndDelete(req.params.id);
    deletedId != null ? resolve(deletedId) : reject("not found");
  });
  checkDelete
    .then((deletedId) => res.json(deletedId + "successfully deleted"))
    .catch((msg) => res.json("no id found"));
});

module.exports = router;
