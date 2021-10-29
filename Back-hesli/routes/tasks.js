const Task = require("../models/task");
const Item = require("../models/item");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const task = await new Task(req.body).save();
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.send(error);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const tasks = await Task.find({_id: req.id});
        res.send(tasks);
    } catch (error) {
        res.send(error);
    }
});

router.get("/item", async (req, res) => {
    try {
        const tasks = await Item.find();
        res.send(tasks);
    } catch (error) {
        res.send(error);
    }
});



router.post("/item", async (req, res) => {
    try {
        const item = await new Item(req.body).save();
        console.log("Regarde : "+req.body);
        res.send(item);
    } catch (error) {
        res.send(error);
    }
});
router.get("/item/:id", async (req, res) => {
    try {
        const tasks = await Item.find({task_id: req.params.id});
        res.send(tasks);
    } catch (error) {
        res.send(error);
    }
});

router.patch("/item/:id", async (req, res) => {
    try {
        const task = await Item.findOneAndUpdate(
             req.params.id,
            req.body
        );
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});
router.put("/item/:id", async (req, res) => {
    try {
        const task = await Item.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

router.delete("/item/:id", async (req, res) => {
    try {
        const task = await Item.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
