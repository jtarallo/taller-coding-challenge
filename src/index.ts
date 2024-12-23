import express from 'express';

type Task = {
  id: string;
  title: string;
  completed: boolean;
}
const tasks: Task[] = [];

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
  res.send(tasks);
});

app.post('/tasks', (req, res) => {
  if (!req.body.id) {
    res.send(`Id is required`)
    return;
  }
  if (tasks.find(task => task.id === req.body.id)){
    res.send(`Task widh Id ${req.body.id} already exists. Use PUT endpoint to update it.`)
    return;
  }
  const task: Task = {
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed,
  }
  tasks.push(task)
});

app.put('/tasks/:id', (req, res) => {
  const foundTaskIdx = tasks.findIndex(task => String(task.id) === req.params.id);
  if (foundTaskIdx === -1){
    res.send(`Task widh Id ${req.params.id} not found.`)
    return;
  }
  const task: Task = {
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed,
  }
  tasks[foundTaskIdx] = task
});

app.delete('/tasks/:id', (req, res) => {
  const foundTaskIdx = tasks.findIndex(task => task.id === req.params.id);
  if (!foundTaskIdx){
    res.send(`Task widh Id ${req.body.id} not found.`)
    return;
  }
  tasks.splice(foundTaskIdx, 1);
});

const port = parseInt(process.env.PORT || '3000');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
