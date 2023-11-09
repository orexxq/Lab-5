const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/data', (req, res) => {
  res.json({ message: 'API data' });
});

router.get('/list', function (req, res) {
  let content = fs.readFileSync('tasks.json', 'utf8');
  let data = JSON.parse(content);
  res.send(data);
});

router.get('/list/:id', function (req, res) {
  try {
    let id = req.params.id;
    let content = fs.readFileSync('tasks.json', 'utf8');
    let tasks = JSON.parse(content);

    let task = tasks.find(task => task.id == id);

    if (task) {
      res.send(task);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


router.delete('/list/:id', function (req, res) {
  const id = req.params.id;
  let data = fs.readFileSync('tasks.json', 'utf8');
  let list = JSON.parse(data);

  try {
    let filteredList = list.filter(item => item.id != id);

    let updatedData = JSON.stringify(filteredList);
    fs.writeFileSync('tasks.json', updatedData);
    res.status(200).send({ status: 200, message: "success" });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).send({ status: 500, message: 'Internal Server Error' });
  }
});


router.post('/list', function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let title = req.body.title;
  let description = req.body.description;

  let task = { title: title, description: description };

  let data = fs.readFileSync('tasks.json', 'utf8');
  let tasks = JSON.parse(data);

  let id = Math.max.apply(
    Math,
    tasks.map(function (o) {
      return o.id;
    })
  );

  task.id = id + 1;
  tasks.push(task);

  fs.writeFileSync('tasks.json', JSON.stringify(tasks));

  res.redirect('/');
});

router.put('/list/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description } = req.body;

  let data = fs.readFileSync('tasks.json', 'utf8');
  let tasks = JSON.parse(data);

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].title = title;
    tasks[taskIndex].description = description;

    fs.writeFileSync('tasks.json', JSON.stringify(tasks));

    res.json({ success: true, message: 'Задача обновлена', task: tasks[taskIndex] });
  } else {
    res.status(404).json({ success: false, message: 'Задача не найдена' });
  }
});


module.exports = router;
