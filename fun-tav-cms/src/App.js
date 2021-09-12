import { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Destination from "./Destination";
import Departure from "./Departure";
import Toast from "./components/Toast";

const initialState = {
  text: "",
  textColor: "",
  body: "toast",
  btn: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "error":
      return {
        text: action.msg,
        textColor: "toast-body text-light",
        body: "toast show align-items-center bg-danger",
        btn: "btn-close btn-close-white me-2 m-auto",
      };
    case "warning":
      return {
        text: action.msg,
        textColor: "toast-body",
        body: "toast show align-items-center bg-warning",
        btn: "btn-close me-2 m-auto",
      };
    case "success":
      return {
        text: action.msg,
        textColor: "toast-body text-light",
        body: "toast show align-items-center bg-success",
        btn: "btn-close btn-close-white me-2 m-auto",
      };
    case "close":
      return {
        text: "",
        textColor: "",
        body: "toast",
        btn: "",
      };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <Navbar />
      <Toast state={state} dispatch={dispatch} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/destination">
          <Destination dispatch={dispatch} />
        </Route>
        <Route path="/departure">
          <Departure />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
