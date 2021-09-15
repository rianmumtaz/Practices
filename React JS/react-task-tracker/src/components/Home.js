import { useState } from "react";
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";

const Home = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "task 1",
      isComplete: false,
    },
    {
      id: 2,
      text: "task 2",
      isComplete: false,
    },
    {
      id: 3,
      text: "task 3",
      isComplete: true,
    },
  ]);

  const [addForm, setAddForm] = useState(false);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    const newTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      } else {
        return task;
      }
    });
    setTasks(newTask);
  };

  const removeTask = (id) => {
    const newTask = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTask);
  };

  const toggleForm = () => {
    setAddForm(!addForm);
  };
  return (
    <div className="container">
      <Header title="Task Tracker" toggleForm={toggleForm} addForm={addForm} />
      {addForm ? <AddTask onAdd={addTask} /> : ""}
      <Tasks tasks={tasks} onRemove={removeTask} onToggle={toggleTask} />
    </div>
  );
};

export default Home;
