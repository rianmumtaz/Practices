import { FaTimes } from "react-icons/fa";

const Task = ({ id, text, isComplete, onRemove, onToggle }) => {
  return (
    <div className={isComplete ? "task reminder" : "task"}>
      <h3
        onDoubleClick={() => {
          onToggle(id);
        }}
      >
        {text}
        <FaTimes
          onClick={() => {
            onRemove(id);
          }}
          style={{ color: "red", cursor: "pointer" }}
        />
      </h3>
    </div>
  );
};

export default Task;
