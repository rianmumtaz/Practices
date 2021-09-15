import AgendaContent from "./AgendaContent";
import AgendaHeader from "./AgendaHeader";
import { useState, useEffect } from "react";
import axios from "axios";

const Agenda = () => {
  const [opt, setOpt] = useState();
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    axios
      .get("/api/mc/", {
        params: {
          ID: 12345,
        },
      })
      .then(function (response) {
        const mc = response.data;
        setOpt(
          mc.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/agenda/", {
        params: {
          ID: 12345,
        },
      })
      .then(function (response) {
        const agenda = response.data;
        setAgenda(agenda);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const addAgenda = (form) => {
    if (
      form.agendaName === "" ||
      form.date === "" ||
      form.noGuest === "" ||
      form.time === "" ||
      form.mc === ""
    ) {
      alert("Some input still empty");
      console.log(form);
    } else {
      axios
        .post("/api/agenda/", form)
        .then(function (response) {
          console.log(response.data);
          if (response.data.new) {
            setAgenda([...agenda, response.data.newAgenda]);
          } else {
            alert("Agenda already existed!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="container pt-5">
      <AgendaHeader opt={opt} onAdd={addAgenda} />
      <AgendaContent agenda={agenda} />
    </div>
  );
};

export default Agenda;
