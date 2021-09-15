import { useState } from "react";

const AgendaAdd = ({ opt, onAdd }) => {
  const [agendaName, setAgendaName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [noGuest, setGuest] = useState("");
  const [mc, setMc] = useState("");
  const [mcName, setMcName] = useState("");
  const [paid, setPaid] = useState(false);

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form>
          <div className="mb-3">
            <label className="form-label">Agenda</label>
            <input
              type="text"
              className="form-control"
              value={agendaName}
              onChange={(e) => {
                setAgendaName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Guests</label>
            <select
              className="form-select"
              value={noGuest}
              onChange={(e) => {
                setGuest(e.target.value);
              }}
            >
              <option defaultValue>Select...</option>
              <option value="10-40">10-40</option>
              <option value="40-60">40-60</option>
              <option value="60-80">60-80</option>
              <option value="80-100">80-100</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">MC</label>
            <select
              className="form-select"
              onChange={(e) => {
                setMc(e.target.value);
                setMcName(e.target.selectedOptions[0].text);
              }}
            >
              <option defaultValue>Select...</option>
              {opt}
            </select>
          </div>
          <div className="mb-3 form-check">
            <label className="form-check-label">Paid</label>
            <input
              type="checkbox"
              className="form-check-input"
              value={paid}
              onChange={(e) => {
                setPaid(e.target.checked);
              }}
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              onAdd({ agendaName, date, time, noGuest, mc, mcName, paid });
            }}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgendaAdd;
