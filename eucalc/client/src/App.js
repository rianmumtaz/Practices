import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBarHome from "./components/NavBarHome";
import Home from "./components/home/Home";
import Database from "./components/database/Index";
import Login from "./components/login/Login";
import ServerError from "./components/error/ServerError";

function App() {
  return (
    <Router>
      <NavBarHome />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/database">
        <Database />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/500">
        <ServerError />
      </Route>
    </Router>
  );
}

export default App;
