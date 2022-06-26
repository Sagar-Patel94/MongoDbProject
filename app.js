const express = require('express');
require('./src/db/conn');
const Student = require('./src/models/students');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

// app.post('/students', (req, res) => {
//     console.log(req.body, "req.body+++");
//     const user = new Student(req.body);
//     console.log(user, "user+++");
//     user.save().then(() => {
//         let data = {
//             message: user
//         }
//         res.status(201).json(data);
//     }).catch((e) => {
//         let data = {
//             message: e
//         }
//         res.status(400).json(data);
//     })
    
// })

app.post('/students', async (req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/students', async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    }
    catch (e) {
        res.send(e);
    }
})

app.get('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentData = await Student.findById(studentId);
        if (!studentData) {
            return res.status(404).send();
        } else {
            res.send(studentData);
        }
    } catch (e) {
        res.status(500).send(e);
    }
})

app.patch('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(studentId, req.body, {
            new: true   // new: true, means fetch new data from updated student
        });
        res.send(updateStudent);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.delete('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(studentId);
        if (!studentId) {
            return res.status(400).send();
        }
        res.send(deleteStudent);
    } catch (e) {
        res.status(500).send(e);
    }
})

app.listen(port, () => {
    console.log(`Connection is setup at ${port}`);
})