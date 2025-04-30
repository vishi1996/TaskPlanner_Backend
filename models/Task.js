const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    priority: String,
    dueDate: Date,
    comment: String,
    attachment: String
})

module.exports = mongoose.model('Task', taskSchema);