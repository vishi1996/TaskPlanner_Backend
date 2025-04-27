const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get All Tasks
router.get('/getTasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching tasks.' });
    }
});

// Add Task route
router.post('/addTask', async (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;
    try {
        const newTask = new Task({ title, description, status, priority, dueDate });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the task.' });
    }
});

// Edit Task route
router.put('/editTask/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;

        await task.save();

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the task.' });
    }
});

// Delete Task route
router.delete('/deleteTask/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the task.' });
    }
});

module.exports = router;
