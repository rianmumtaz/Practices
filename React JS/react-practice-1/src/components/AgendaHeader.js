import Button from "./Button";
import AgendaAdd from "./AgendaAdd";
import { useState } from "react";

const AgendaHeader = ({ opt, onAdd }) => {
  const [show, setShow] = useState(false);

  const showAdd = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h1>Agenda Page</h1>
        <Button text="Add" className="btn btn-success" onClick={showAdd} />
      </div>
      {show && <AgendaAdd opt={opt} onAdd={onAdd} />}
    </>
  );
};

export default AgendaHeader;
