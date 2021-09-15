import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  return (
    <form
      className="add-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (text) {
          onAdd({ text, isComplete });
        } else {
          alert("please add task");
        }
        setText("");
        setIsComplete(false);
      }}
    >
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add task..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></input>
      </div>
      <div className="form-control form-control-check">
        <label>Completed?</label>
        <input
          type="checkbox"
          checked={isComplete}
          value={isComplete}
          onChange={(e) => {
            setIsComplete(e.currentTarget.checked);
          }}
        ></input>
      </div>
      <input type="submit" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
