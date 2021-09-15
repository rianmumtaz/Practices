import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Route path="/home" component={Home}></Route>
      <Route path="/about1">
        <h1>About1 Page</h1>
      </Route>
      <Route path="/about2">
        <h1>About2 Page</h1>
      </Route>
      <Route path="/contact">
        <h1>Contact Page</h1>
      </Route>
      <Route path="/" exact>
        <h1>Welcome</h1>
      </Route>
    </Router>
  );
}

export default App;
