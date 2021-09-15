import { BrowserRouter as Router, Route } from "react-router-dom";
import NavHome from "./components/NavHome";
import Agenda from "./components/Agenda";

function App() {
  return (
    <Router>
      <NavHome />
      <Route path="/" exact>
        <h1>Home Page</h1>
      </Route>
      <Route path="/agenda" component={Agenda}></Route>
      <Route path="/contact">
        <h1>Contact Page</h1>
      </Route>
    </Router>
  );
}

export default App;
