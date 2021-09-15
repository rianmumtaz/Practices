import Task from "./Task";

const Tasks = ({ tasks, onRemove, onToggle }) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            text={task.text}
            isComplete={task.isComplete}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        );
      })}
    </>
  );
};

export default Tasks;
