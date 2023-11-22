//Todo.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');


const TodoSchema = new Schema({
    id: { type: String, default: uuidv4 },  
    title: { type: String, required: true },
    description: { type: String, default: '' },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateCreated: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    dateCompleted: { type: Date }
});
//Export model
module.exports = mongoose.model("Todo", TodoSchema);
