const AgendaContent = ({ agenda }) => {
  return (
    <table className="table table-primary table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Agenda</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Guest</th>
          <th scope="col">MC</th>
          <th scope="col">Payments</th>
        </tr>
      </thead>
      <tbody id="body">
        {agenda.map((element, index) => {
          return (
            <tr key={element._id}>
              <td>{index + 1}</td>
              <td>{element.agendaName}</td>
              <td>{new Date(element.date).toUTCString().substr(0, 16)}</td>
              <td>{element.time}</td>
              <td>{element.noGuest}</td>
              <td>{element.mcName}</td>
              <td>{element.paid ? "paid" : "not paid"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AgendaContent;
