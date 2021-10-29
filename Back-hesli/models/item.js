const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({

    task_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'task',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("item", itemSchema);
